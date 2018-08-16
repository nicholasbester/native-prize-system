import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider';

@IonicPage()
@Component({
  selector: 'page-prize-list',
  templateUrl: 'prize-list.html'
})
export class PrizeListPage {
  prizes:Array<Object>;

  constructor(public alertCtrl:AlertController, private dataProvider: DataProvider) {
  }

  ngOnInit() {
    this.prizes = this.dataProvider.getData('prizes');
  }

  savePrizes() {
    let prompt = this.alertCtrl.create({
      title: 'Save Prize Quantities',
      message: "Are you sure you want to replace the prize quantities?",
      buttons: 
      [{
        text: 'Yes',
        handler: data => {
          this.dataProvider.saveData(this.prizes, 'prize');
        }
      },
      {
        text: 'No',
        handler: data => {
          console.log('Cancelled prize save');
        }
      }]
      });
      prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizeListPage');
  }

}
