import { Injectable } from '@angular/core';
import { Prize } from '../../models/Prize';
import { Storage } from '@ionic/storage';

@Injectable()
export class PrizeDataProvider {
  constructor(private storage: Storage, private prizes: Array<Prize>) {
    this.storage = storage;
    this.prizes = [];
    this.storage.set('prizes', []);
  } 

  async onInit() {
    this.prizes = await this.storage.set('prizes', [
      new Prize('Prize 1', 'Description 1', 10, 3 ),
      new Prize('Prize 2', 'Description 2', 10, 3 ),
      new Prize('Prize 3', 'Description 3', 10, 3 ),
      new Prize('Prize 4', 'Description 4', 10, 3 ),
      new Prize('Prize 5', 'Description 5', 10, 3 ),
      new Prize('Prize 6', 'Description 6', 10, 3 ),
      new Prize('Prize 7', 'Description 7', 10, 3 )
    ]);
  }

  async getPrizes(): Promise<Array<Prize>> {
    this.prizes = await this.storage.get('prizes');
    return this.prizes;
  }

  async savePrize(prize: Prize) {
    this.prizes = await this.storage.get('prizes');
    this.prizes.push(prize);
    this.storage.set('prizes', this.prizes);
  }
}
