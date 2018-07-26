import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-prize-list',
  templateUrl: 'prize-list.html',
})
export class PrizeListPage {
  prizes: Array<{name: string, description: string, quantity: number, winRatio: number}>; 

  constructor() {
    this.prizes = [
      { name: 'Prize 1', description: 'Description 1', quantity: 10, winRatio: 3 },
      { name: 'Prize 2', description: 'Description 2', quantity: 10, winRatio: 3 },
      { name: 'Prize 3', description: 'Description 3', quantity: 10, winRatio: 3 },
      { name: 'Prize 4', description: 'Description 4', quantity: 10, winRatio: 3 },
      { name: 'Prize 5', description: 'Description 5', quantity: 10, winRatio: 3 },
      { name: 'Prize 6', description: 'Description 6', quantity: 10, winRatio: 3 },
      { name: 'Prize 7', description: 'Description 7', quantity: 10, winRatio: 3 },
    ]; // TODO: Change to a service

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizeListPage');
  }

}
