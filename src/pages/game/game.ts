import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThankYouPage } from '../thank-you/thank-you';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
