import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StartPage } from '../start/start';
import { GamePage } from '../game/game';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/data-provider';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userFields: Array<Object>;
  formData: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private dataProvider:DataProvider, public alertCtrl:AlertController) {
    this.userFields = this.dataProvider.getUserFields();
    this.formData = this.formBuilder.group(dataProvider.getFormData());
  }

  submitForm() {
    console.log(this.formData.value);
    if (this.formData.valid) {
      this.dataProvider.saveData(this.formData.value);
    } else {
      this.showFormValidation();
    }
  }

  showFormValidation() {
    let requiredFieldsWarning = this.alertCtrl.create({
      title: 'Oops, all fields are required',
      message: 'Please add all information into the fields ',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    requiredFieldsWarning.present();
  }

  gotoPage(page:string) {
    if(page === 'start') {
      this.navCtrl.setRoot(StartPage);
    } else if (page === 'game') {
      this.navCtrl.setRoot(GamePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
