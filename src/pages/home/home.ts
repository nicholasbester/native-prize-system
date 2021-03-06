import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrizeListPage } from '../prize-list/prize-list';
import { UserAdminPage } from '../user-admin/user-admin';
import { StartPage } from '../start/start';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: NativeTransitionOptions = {
    duration: 100,
    slowdownfactor: 10,
    slidePixels: 200,
    iosdelay: 15,
    androiddelay: 15
  }
  constructor(private navCtrl: NavController, private nativePageTransition: NativePageTransitions) {}

  gotoPage(value: string) {
    this.nativePageTransition.fade(this.options);
    if (value === 'start') this.navCtrl.push(StartPage);
    else if (value === 'users') this.navCtrl.push(UserAdminPage);
    else if (value === 'prizes') this.navCtrl.push(PrizeListPage);
  }
}
