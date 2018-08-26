import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { UserModalPage } from '../user-modal/user-modal';
import { DataProvider } from '../../providers/data-provider';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-user-admin',
  templateUrl: 'user-admin.html'
})
export class UserAdminPage {
  users: Array<any>;
  options: NativeTransitionOptions = {
    duration: 2000,
    slowdownfactor: 3,
    slidePixels: 20,
    iosdelay: 100,
    androiddelay: 150
  }

  constructor(public modalCtrl:ModalController, public alertCtrl:AlertController, private dataProvider:DataProvider, private nativePageTransition: NativePageTransitions) {
    this.users = [];
  }

  ngOnInit() {
    this.nativePageTransition.fade(this.options);
    this.users = this.dataProvider.getData('users');
  }

  openModal(user) {
    let userModalPage = this.modalCtrl.create(UserModalPage, {user: user});
    userModalPage.present();
  }

  showExportEmailShare() {
    let prompt = this.alertCtrl.create({
    title: 'Export the data',
    message: "Export the CSV data to file",
    buttons: 
    [{
      text: 'Cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Export',
      handler: data => {
        this.dataProvider.exportData('users');
      }
    }]
    });
    prompt.present();
  }

  showDeleteConfirmation() {
    let confirm = this.alertCtrl.create({
      title: 'Would you like to clear the user database?',
      message: 'By doing this you will wipe all the information off this device and it will no longer be recoverable, please ensure that you have backed up the data before doing this.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Declined clearing database');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.users = [];
            this.dataProvider.clearData('users');
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAdminPage');
  }
  
}