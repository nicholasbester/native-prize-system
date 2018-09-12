import { Injectable } from "@angular/core";
import { Prize } from "../models/Prize";
import { Storage } from "@ionic/storage";

@Injectable()
export class PrizeService {
  prizes: Array<Prize>;
  userPrizes: Array<any>;

  constructor(private storage: Storage) { }

  async initialise() {
    await this.storage.get('ratio').then((value: string) => {
      if (value) Prize.RATIO = +value;
      else {
        console.log('Saving ratio');
        Prize.RATIO = 10;
        this.saveRatio(Prize.RATIO);
      }
    }).then(() => {
      this.storage.get("prizes").then((value: Array<Prize>) => {
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

  async saveRatio(data: number) {
    Prize.RATIO = data;
    await this.storage.set('ratio', data);
  }

  async savePrize(data: Array<Prize>) {
    console.log('Save prizes');
    this.prizes = data;

    await this.storage.set("prizes", this.prizes).then(() => {
      this.userPrizes = this.createPrizeArray(this.prizes, Prize.RATIO);
    });
  }

  clearPrizes() {
    this.prizes = [];
    this.storage.set("prizes", []);
  }

  getRatio(): number {
    return Prize.RATIO;
  }

  getPrize(): Prize {
    console.log('Get Prize');
    let slug = this.userPrizes.pop();
    let prize;

    for (let i = 0; i < this.prizes.length; i++) {
      if (this.prizes[i].slug === slug) {
        console.log(slug);
        prize = this.prizes[i];
        if (this.prizes[i]['quantity'] > 0) this.decrementPrize(this.prizes[i]);
        break;
      }
    };
     
    return prize;
  }

  // Decrement prize value
  async decrementPrize(prize: Prize) {
    console.log('Decrement prize');
    for (let i = 0; i < this.prizes.length; i++) {
      if (this.prizes[i].slug === prize.slug) {
        this.prizes[i].quantity--;
        break;
      }
    };

    this.prizes = await this.storage.set("prizes", this.prizes);
  }

  // A prize array is created from the prizes and amount of times a person can try again
  createPrizeArray(inarr: Array<Prize>, ratio: number): Array<any> {
    console.log('Creating user prize array');
    let arr = [];
    let localPrizes = [];
    let tempQuantities: Array<number> = [];
    let tempCount = 0;

    // Get the quantity of the prizes into a value and store the quantities for reference
    let j = 0;
    inarr.forEach(item => {
      if (item.quantity > 0) {
        localPrizes[j] = {
          name: item['name'],
          slug: item['slug'],
          quantity: item['quantity'],
          imageSource: item['imageSource']
        };
        j++;
      }
      tempQuantities.push(item.quantity);
      tempCount += item.quantity;
    });

    if (tempCount > 0) {
      // Local prize quantities is decrimented until no prizes remain to dispense
      // Prizes are pushed to an array to be understood by the prize mechanic
      let i = 0;

      while (localPrizes.length > 0) {
        let randomValue = Math.floor(Math.random() * (localPrizes.length));

        if (randomValue >= localPrizes.length) {
          randomValue = localPrizes.length - 1;
        }

        if (i % ratio === 0) {
          arr.push(localPrizes[randomValue].slug); 
          localPrizes[randomValue]['quantity']--;
          if (localPrizes[randomValue]['quantity'] <= 0) localPrizes.splice(randomValue, 1);  
        } else {
          arr.push("try-again");
        }

        i++;
      }

    } else {
      console.log("None of the prizes had a quantity greater than 0");
    }

    let count = 0;

    inarr.forEach(item => {
      item.quantity = tempQuantities[count];
      count++;
    });

    return arr;
  }
}
