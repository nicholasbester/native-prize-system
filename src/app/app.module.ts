import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PrizeListPage } from '../pages/prize-list/prize-list';
import { UserAdminPage } from '../pages/user-admin/user-admin';
import { UserModalPage } from '../pages/user-modal/user-modal';
import { StartPage } from '../pages/start/start';
import { RegisterPage } from '../pages/register/register';
import { GamePage } from '../pages/game/game';
import { ThankYouPage } from '../pages/thank-you/thank-you';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data-provider';
import { File } from '@ionic-native/file';

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
    ThankYouPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    ThankYouPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    DataProvider,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
