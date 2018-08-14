import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  gotoStart() {
    this.navCtrl.setRoot(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
