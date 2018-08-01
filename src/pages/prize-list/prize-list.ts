import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider';

@IonicPage()
@Component({
  selector: 'page-prize-list',
  templateUrl: 'prize-list.html'
})
export class PrizeListPage {
  prizes: Array<any>;

  constructor(private dataProvider: DataProvider) {
    this.prizes = [];
  }

  ngOnInit() {
    this.prizes = this.dataProvider.getData('prizes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrizeListPage');
  }

}
