import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PrizeListPage } from '../pages/prize-list/prize-list';
import { UserAdminPage } from '../pages/user-admin/user-admin';
import { UserModalPage } from '../pages/user-modal/user-modal';
import { PrizeModalPage, } from '../pages/prize-modal/prize-modal';
import { StartPage } from '../pages/start/start';
import { RegisterPage } from '../pages/register/register';
import { GamePage } from '../pages/game/game';
import { VinylComponent } from '../components/vinyl/vinyl';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data-provider';
import { File } from '@ionic-native/file';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { NativeAudio } from '@ionic-native/native-audio';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrizeListPage,
    UserAdminPage,
    UserModalPage,
    StartPage,
    RegisterPage,
    GamePage,
    PrizeModalPage,
    VinylComponent 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // modalEnter: 'fade-in',
      // modalLeave: 'fade-out',
      // pageTransition: 'fade'
      scrollAssist: true,
      autoFocusAssist: true
    }),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrizeListPage,
    UserAdminPage,
    UserModalPage,
    StartPage,
    RegisterPage,
    GamePage,
    PrizeModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    NativeAudio,
    NativePageTransitions,
    Device,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard
  ]
})
export class AppModule {}
