import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Prize } from '../models/Prize';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Injectable()
export class DataProvider {
  users: User[];
  prizes: Prize[];
  storageFolder: string;

  exportOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: false,
    useBom: false,
    noDownload: true,
    headers: []
  }
  
  constructor(public platform: Platform, private storage: Storage, private file:File) {
    if (platform.is('ios')) this.storageFolder = file.documentsDirectory
    else if (platform.is('android')) this.storageFolder = file.dataDirectory
  } 

  async initialise() {

    this.storage.get('users').then((value:Array<User>) => {
      value.length === 0? this.users = [] : this.users = value;
    });

    this.storage.get('prizes').then((value:Array<Prize>) => {
      value.length === 0? this.prizes = [] : this.prizes = value;
    });
    
    // Temporary
    this.users = await this.storage.set('users', [
      new User('ljkhlkjh', 'ljhlkjh', 'ljkhl@jhljh.com', '75647547', true),
      new User('Dalkjhlkjhvid', 'Blah', 'ljkhljkh@lkjhljk.com', '7564765476', true),
      new User('Jljkhlkjhames', 'Test', 'jghfjhgf@ghfjhg.com', '76547654', true),
      new User('Silkjhljkmon', 'jkfhfslkjsh', 'jgfjghf@jhgfjgh.com', '75647564', true),
      new User('Jojkhljhhn', 'Mississippi', 'me@gfjgf.com', '76547654', true)
    ]);

    this.prizes = await this.storage.set('prizes', [
      new Prize('ljkhlkjh', 'ljhlkjh', 10, 3),
      new Prize('Dalkjhlkjhvid', 'Blah', 50, 2),
      new Prize('Jljkhlkjhames', 'k,hgjlkjh', 20, 3),
      new Prize('Silkjhljkmon', 'jkfhfslkjsh', 100, 10),
    ]);
  }

  getData(value: string): any {
    if (value === 'users') {
      return this.users
    } else if (value === 'prizes') {
      return this.prizes;
    } 
  }

  async saveData(data: any) {
    if(data instanceof User) {
      this.users = await this.storage.get('users');
      this.users.push(data);
      this.storage.set('users', this.users);
    } else if (data instanceof Prize) {
      this.prizes = await this.storage.get('prizes');
      this.prizes.push(data);
      this.storage.set('prizes', this.prizes);
    }
  }

  exportData(type) {
    if (type === 'users') {

      this.exportOptions.headers = [];

      for (let key in this.users[0]) {
        this.exportOptions.headers.push(key);
      }

      let csvExport = new Angular5Csv(this.users, 'appData.csv', this.exportOptions);
      console.log(csvExport);

    } else if (type === 'prizes') {

    }

    // type === 'users'? console.log(JSON.stringify(this.users)) : console.log(JSON.stringify(this.prizes));
  }

  clearData(type) {
    type === 'users'? this.users = [] : this.prizes = [];
    this.storage.set(type, []);
  }
}
