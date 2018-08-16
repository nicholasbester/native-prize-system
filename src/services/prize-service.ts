import { Injectable } from "@angular/core";
import { Prize } from "../models/Prize";
import { Storage } from "@ionic/storage";

@Injectable()
export class PrizeService {
  prizes: Array<Prize>;
  userPrizes: Array<any>;

  constructor(private storage: Storage) {}

  async initialise() {
    await this.storage.get("prizes").then((value: Array<Prize>) => {
      if (value && value.length > 0) {
        console.log('Prize array exists, restoring array');
        this.prizes = value;
        this.userPrizes = this.createPrizeArray(this.prizes, Prize.RATIO);
      } else {
        console.log('Create prize array');
        this.setNewPrizes();
        this.userPrizes = this.createPrizeArray(this.prizes, Prize.RATIO);
      }
    });
  }

  async setNewPrizes() {
    console.log('Setting new prize array');
    this.prizes = Prize.setDefaultPrizes();
    await this.storage.set("prizes", this.prizes);
  }

  getPrizes(): Array<Prize> {
    console.log('Get this.prizes');
    return this.prizes;
  }

  async savePrize(data:Array<Prize>) {
    console.log('Save prizes')
    this.prizes = data;
    await this.storage.set("prizes", this.prizes).then(() => {
      this.createPrizeArray(this.prizes, Prize.RATIO);
    });
  }

  clearPrizes() {
    this.prizes = [];
    this.storage.set("prizes", []);
  }

  getPrize(): Prize {
    let prize = this.userPrizes.pop();
    this.decrementPrize(prize);
    return prize;
  }

  // Decrement prize value
  async decrementPrize(prize: Prize) {
    for (let i = 0; i < this.prizes.length; i++) {
      if (this.prizes[i] === prize) this.prizes[i].quantity--;
    };

    this.prizes = await this.storage.set("prizes", this.prizes);
  }

  // A prize array is created from the prizes and amount of times a person can try again
  createPrizeArray(inarr:Array<Prize>, ratio: number): Array<any> {
    console.log('Creating user prize array');
    let arr = [];
    let localPrizes = inarr.slice(0);
    let tempQuantities:Array<number> = [];

    // Get the quantity of the prizes into a value and store the quantities for reference
    inarr.forEach(item => {
      tempQuantities.push(item.quantity);
    });

    // Local prize quantities is decrimented until no prizes remain to dispense
    // Prizes are pushed to an array to be understood by the prize mechanic
    let i = 0;
    while (localPrizes.length > 0) {
      if (i % ratio === 0) {
        let randomValue = Math.floor(Math.random() * (localPrizes.length));
        arr.push(localPrizes[randomValue]);
        localPrizes[randomValue].quantity--;
        if (localPrizes[randomValue].quantity === 0) localPrizes.splice(randomValue, 1);
      } else arr.push("try-again");
      i++;
    }

    let count = 0;
    inarr.forEach(item => {
      item.quantity = tempQuantities[count];
      count++;
    });

    return arr;
  }
}
