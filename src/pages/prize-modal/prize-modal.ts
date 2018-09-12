import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-prize-modal',
  templateUrl: 'prize-modal.html',
})
export class PrizeModalPage {
  prize: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prize = navParams.get('prize');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizeModalPage');
  }
}
