import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {
  user: Object;

  constructor(public params: NavParams, public viewCtrl: ViewController) {
    this.user = params.get('user');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserModalPage');
  }

}