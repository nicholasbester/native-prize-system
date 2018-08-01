import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Prize } from '../../models/Prize';
import { PrizeDataProvider } from '../../providers/prize-data/prize-data';

@IonicPage()
@Component({
  selector: 'page-prize-list',
  templateUrl: 'prize-list.html',
})
export class PrizeListPage {
  prizes: Prize[];

  constructor(private prizeService: PrizeDataProvider) {}

  async onInit() {
    this.prizes = await this.prizeService.getPrizes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizeListPage');
  }

}
