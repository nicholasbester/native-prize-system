import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { UserModalPage } from '../user-modal/user-modal'

@IonicPage()
@Component({
  selector: 'page-user-admin',
  templateUrl: 'user-admin.html',
})
export class UserAdminPage {
  users: Array<{name: string, surname: string, email: string, cellNumber: string, marketing: boolean}>; // TODO convert to model

  constructor(public modalCtrl:ModalController) {
    this.users = [
      { name: 'Nicholas', surname: 'Bester', email: 'me@nickbester.com', cellNumber: '0791722749', marketing: true },
      { name: 'David', surname: 'Blah', email: 'me@david.com', cellNumber: '0722340464', marketing: true },
      { name: 'James', surname: 'Test', email: 'me@james.com', cellNumber: '1234567890', marketing: false },
      { name: 'Simon', surname: 'Longassfuckingsurname', email: 'me@simon.com', cellNumber: '0987654321', marketing: false },
      { name: 'John', surname: 'Mississippi', email: 'me@John.com', cellNumber: '1234509876', marketing: true }
    ]
  }

  openModal(user) {
    let userModalPage = this.modalCtrl.create(UserModalPage, {user: user});
    userModalPage.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAdminPage');
  }

}