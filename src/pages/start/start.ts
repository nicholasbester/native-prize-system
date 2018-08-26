import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  @ViewChild(Nav) nav: Nav;
  options: NativeTransitionOptions = {
    duration: 2000,
    slowdownfactor: 10,
    slidePixels: 200,
    iosdelay: 150,
    androiddelay: 150
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransition: NativePageTransitions) {}

  gotoStart() {
    this.nativePageTransition.fade(this.options);
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

}
