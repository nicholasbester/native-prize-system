import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController } from 'ionic-angular';
import { UserModalPage } from '../user-modal/user-modal';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DataProvider } from '../../providers/data-provider';

@IonicPage()
@Component({
  selector: 'page-user-admin',
  templateUrl: 'user-admin.html'
})
export class UserAdminPage {
  users: Array<any>;

  constructor(public modalCtrl:ModalController, public alertCtrl:AlertController, private socialSharing:SocialSharing, private dataProvider:DataProvider) {
    this.users = [];

    this.socialSharing.canShareViaEmail().then(() => {
      console.log('Sharing is possible');
    }).catch(() => {
      console.log('Email sharing is NOT possible');
    });
  }

  ngOnInit() {
    this.users = this.dataProvider.getData('users');
  }

  openModal(user) {
    let userModalPage = this.modalCtrl.create(UserModalPage, {user: user});
    userModalPage.present();
  }

  showExportEmailShare() {
    const prompt = this.alertCtrl.create({
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
    const confirm = this.alertCtrl.create({
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