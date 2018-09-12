import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider';
import { Prize } from "../../models/Prize";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-prize-list',
  templateUrl: 'prize-list.html'
})
export class PrizeListPage {
  prizes: Array<Prize>;
  venue: string;
  ratio: number;

  options: NativeTransitionOptions = {
    duration: 100,
    slowdownfactor: 10,
    slidePixels: 200,
    iosdelay: 15,
    androiddelay: 15
  }

  constructor(public alertCtrl: AlertController, private dataProvider: DataProvider, private nativePageTransition: NativePageTransitions) {}

  ngOnInit() {
    this.nativePageTransition.fade(this.options);
    this.venue = this.dataProvider.getData('venue');
    this.ratio = this.dataProvider.getData('ratio');
    this.prizes = this.dataProvider.getData('prizes');
  }

  saveData() {
    let prompt = this.alertCtrl.create({
      title: 'Save Prize Quantities and venue',
      message: "Are you sure you want to replace the prize quantities and save the venue?",
      buttons:
        [{
          text: 'Yes',
          handler: data => {
            this.prizes.forEach((prize, index) => {
              this.prizes[index]['quantity'] = +this.prizes[index]['quantity'];
            });
            this.ratio = +this.ratio;
            this.dataProvider.saveData(this.prizes, 'prize');
            this.dataProvider.saveData(this.venue, 'venue');
            this.dataProvider.saveData(this.ratio, 'ratio');
          }
        },
        {
          text: 'No',
          handler: data => {
          }
        }]
    });
    prompt.present();
  }

  updateQuantity(event:any, index: number) {
    this.prizes[index].quantity = event.target.value;
  }

  ionViewDidLoad() {}
}
