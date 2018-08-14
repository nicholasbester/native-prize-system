import { Injectable } from "@angular/core";
import { Prize } from "../models/Prize";
import { Storage } from "@ionic/storage";

@Injectable()
export class PrizeService {
  prizes: Array<Prize>;

  constructor(private storage: Storage) {}

  async initialise() {
    this.storage.get("prizes").then((value: Array<Prize>) => {
      value.length === 0 ? (this.prizes = []) : (this.prizes = value);
    });

    // TODO: Temporary
    this.prizes = await this.storage.set("prizes", [
      new Prize("Toy", "Awesome", 5),
      new Prize("Ball", "Ok", 5),
      new Prize("Blanket", "Fun", 10),
      new Prize("Frisbie", "Dog", 5)
    ]);
  }

  getPrizes(): Array<Prize> {
    return this.prizes;
  }

  async savePrize(data:Prize, ratio:number) {
    this.prizes = await this.storage.get("prizes");
    this.prizes.push(data);
    this.storage.set("prizes", this.prizes);
    this.createPrizeArray(ratio);
  }

  clearPrizes() {
    this.prizes = [];
    this.storage.set("prizes", []);
  }

  // Decrement prize value
  decrementPrize(prize: Prize) {
    this.prizes.forEach(prize => {
      prize.quantity--;
    });
  }

  // A prize array is created from the prizes and amount of times a person can try again
  createPrizeArray(ratio: number): Array<string> {
    let arr = [];
    let prizeLength = 0;
    let localPrizes = this.prizes;

    // Get the quantity of the prizes into a value
    this.prizes.forEach(item => {
      prizeLength += item.quantity;
    });

    // We multiply against try again ratio to get the length of the prize array
    prizeLength = prizeLength * ratio;

    // Local prize quantities is decrimented until no prizes remain to dispense
    // Prizes are pushed to an array to be understood by the prize mechanic
    for (var i = 0; i < prizeLength; i++) {
      if (i % ratio === 0) {
        let randomValue = Math.floor(Math.random() * (localPrizes.length - 1));
        arr.push(localPrizes[randomValue].name);
        localPrizes[randomValue].quantity--;
        if (localPrizes[randomValue].quantity === 0)
          localPrizes.splice(randomValue, 1);
      } else {
        arr.push("tryAgain");
      }
    }
    return arr;
  }
}
