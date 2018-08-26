import { Component, ViewChild } from '@angular/core';
import { ModalController, Modal, NavController, NavParams } from 'ionic-angular';
import { StartPage } from '../start/start';
import { RegisterPage } from '../register/register';
import { DataProvider } from '../../providers/data-provider';
import { PrizeModalPage } from '../prize-modal/prize-modal';
import { NativeAudio } from '@ionic-native/native-audio';
import { VinylComponent } from '../../components/vinyl/vinyl';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  @ViewChild('vinylA') vinylA:VinylComponent;
  @ViewChild('vinylB') vinylB:VinylComponent;

  prizeReceived:Boolean = false
  prizeName:string = '';
  prizeModalPage:Modal;
  audioLoaded:Boolean = false;

  options: NativeTransitionOptions = {
    duration: 2000,
    slowdownfactor: 10,
    slidePixels: 200,
    iosdelay: 150,
    androiddelay: 150
  }

  constructor(public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams, private dataProvider:DataProvider, private nativeAudio: NativeAudio, private nativePageTransition: NativePageTransitions) {
  }

  ngAfterViewInit() {
    this.nativeAudio.play('music');
  }

  stopMusic() {
    this.nativeAudio.stop('music');
  }
  
  playScratch() {
    this.nativeAudio.play('scratch');
    
  }

  getPrize(vinyl:string) {
    if (!this.prizeReceived) {
      let prize:any = this.dataProvider.getUserPrize();
      this.prizeReceived = true;

      this.nativeAudio.play('scratch');
      this.nativeAudio.stop('music');

      // TODO: Play scratch sound here
      if (vinyl == 'prizeModalA') this.vinylB.stopSpinning();
      if (vinyl == 'prizeModalB') this.vinylA.stopSpinning();

      if (prize !== undefined) {
        if (prize == 'try-again') {
          this.displayPrizeModal({name: 'try-again', imageSource: 'try-again.png'}, vinyl);
          this.prizeName = 'try-again';

          this.nativeAudio.play('aww');

        } else {
          this.prizeName = prize.name;
          this.displayPrizeModal(prize, vinyl);

          this.nativeAudio.play('cheer');
        }
      } else {
        this.prizeName = 'try-again';
        this.displayPrizeModal({name: 'try-again', imageSource: 'try-again.png'}, vinyl);
        this.nativeAudio.play('aww');
      }
    } 
  }

  displayPrizeModal(prize: Object, vinyl:string) {
    this.prizeModalPage = this.modalCtrl.create(PrizeModalPage, {prize: prize}, {showBackdrop: false, cssClass: vinyl, enableBackdropDismiss: false });
    this.prizeModalPage.present();
  }

  gotoPage(page:string) {
    this.nativePageTransition.fade(this.options);
    if(page === 'register') {
      this.navCtrl.push(RegisterPage);
    } else if (page === 'start') {
      this.prizeModalPage.dismiss().then( () => {
        this.navCtrl.push(StartPage);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }
}