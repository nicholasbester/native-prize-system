import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { PrizeListPage } from '../pages/prize-list/prize-list';
import { UserAdminPage } from '../pages/user-admin/user-admin';
import { UserModalPage } from '../pages/user-modal/user-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data/user-data';
import { PrizeDataProvider } from '../providers/prize-data/prize-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrizeListPage,
    UserAdminPage,
    UserModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrizeListPage,
    UserAdminPage,
    UserModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    UserDataProvider,
    PrizeDataProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
