import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StartPage } from '../start/start';

@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  gotoPage(page:string) {
    if(page === 'start') {
      this.navCtrl.setRoot(StartPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankYouPage');
  }

}
