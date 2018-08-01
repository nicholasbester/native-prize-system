import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { User } from '../../models/User';

@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {
  user: User;

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