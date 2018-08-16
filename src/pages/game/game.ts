import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankYouPage } from '../thank-you/thank-you';
import { RegisterPage } from '../register/register';
import { DataProvider } from '../../providers/data-provider';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  prizeReceived:Boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider:DataProvider) {}

  // TODO: 
  // Display Prize
  // Load Vinyls components

  getPrize() {
    // if (!this.prizeReceived) {
      let prize:any = this.dataProvider.getUserPrize();
      this.prizeReceived = true;
      // Display prize
      if (prize == 'try-again') {
        console.log(prize);
      } else {
        console.log(prize.name);
      }
      // Display button to go to Thank you page
    // } 
  }

  gotoPage(page:string) {
    if(page === 'register') {
      this.navCtrl.setRoot(RegisterPage);
    } else if (page === 'thank-you') {
      this.navCtrl.setRoot(ThankYouPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }
}