import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { PrizeListPage } from '../pages/prize-list/prize-list';
import { UserAdminPage } from '../pages/user-admin/user-admin';
import { StartPage } from '../pages/start/start';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data-provider';
import { Storage } from "@ionic/storage";
import { Keyboard } from '@ionic-native/keyboard'
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public dataProvider: DataProvider,
    private storage:Storage,
    private keyboard: Keyboard,
    private nativeAudio:NativeAudio
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Prize and venue management', component: PrizeListPage },
      { title: 'Users registered', component: UserAdminPage },
      { title: 'Game', component: StartPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.hideKeyboardAccessoryBar(false);

      this.storage.ready().then(() => {
        // The user and prize data services are initialised and checked for existing data.
        this.dataProvider.initialise();

        this.nativeAudio.preloadComplex('music', 'assets/audio/music.mp3', .5, 1, 0);
        this.nativeAudio.preloadSimple('scratch', 'assets/audio/scratch.mp3');
        this.nativeAudio.preloadSimple('aww', 'assets/audio/aww.mp3');
        this.nativeAudio.preloadSimple('cheer', 'assets/audio/cheer.mp3');
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
