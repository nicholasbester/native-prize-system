import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserDataProvider {

  constructor(private storage: Storage, private users: Array<User>) {
    this.storage = storage;

    this.users = [];
    this.storage.set('users', []);
  } 

  async onInit() {
    this.users = await this.storage.set('users', [
      new User('Nicholas', 'Bester', 'me@nickbester.com', '0791722749', true),
      new User('David', 'Blah', 'me@david.com', '0722340464', true),
      new User('James', 'Test', 'me@james.com', '1234567890', true),
      new User('Simon', 'Longassfuckingsurname', 'me@simon.com', '0987654321', true),
      new User('John', 'Mississippi', 'me@John.com', '1234509876', true)
    ]);
  }

  async getUsers(): Promise<Array<User>> {
    this.users = await this.storage.get('users');
    return this.users;
  }

  async saveUser(user: User) {
    this.users = await this.storage.get('users');
    this.users.push(user);
    this.storage.set('users', this.users);
  }

  exportUserData() {
    // TODO create user data export function
  }

  clearUsers() {
    this.users = [];
    this.storage.set('users', []);
  }

}
