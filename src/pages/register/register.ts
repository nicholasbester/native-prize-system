import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StartPage } from '../start/start';
import { GamePage } from '../game/game';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataProvider } from '../../providers/data-provider';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userFields: Array<Object>;
  formData: FormGroup;
  foo = 5;

  options: NativeTransitionOptions = {
    duration: 100,
    slowdownfactor: 10,
    slidePixels: 200,
    iosdelay: 15,
    androiddelay: 15
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private dataProvider:DataProvider, public alertCtrl:AlertController, private nativePageTransition: NativePageTransitions) {
    this.userFields = this.dataProvider.getUserFields();
    this.formData = this.formBuilder.group(dataProvider.getFormData());
  }

  submitForm() {
    this.formData.value['venue'] = this.dataProvider.getData('venue');

    if (this.formData.valid) {
      this.dataProvider.saveData(this.formData.value, 'user');
      this.gotoPage('game');
    } else {
      this.showFormValidation();
    }
  }

  showFormValidation() {
    let requiredFieldsWarning = this.alertCtrl.create({
      title: 'Oh no!',
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
    this.nativePageTransition.fade(this.options);
    if(page === 'start') {
      this.navCtrl.setRoot(StartPage);
    } else if (page === 'game') {
      this.navCtrl.setRoot(GamePage);
    } else if (page === 'back') {
      this.navCtrl.getPrevious();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
