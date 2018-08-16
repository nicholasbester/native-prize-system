import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { Prize } from "../models/Prize";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Platform } from "ionic-angular";
import { UserService } from "../services/user-service";
import { PrizeService } from "../services/prize-service";

@Injectable()
export class DataProvider {
  userService:UserService;
  prizeService:PrizeService;

  constructor(
    public platform: Platform,
    private storage: Storage,
    private file: File
  ) {
    this.userService = new UserService(platform, storage, file);
    this.prizeService = new PrizeService(storage);
  }

  async initialise() {
    this.userService.initialise();
    this.prizeService.initialise();
  }

  getData(value: string): any {
    if (value === "users") {
      return this.userService.getUsers();
    } else if (value === "prizes") {
      return this.prizeService.getPrizes();
    }
  }

  getUserPrize():Prize {
    return this.prizeService.getPrize();
  }

  getUserFields():Array<Object> {
    return User.fieldTypes;
  }

  getFormData():Object {
    let obj = {};
    for (let item in this.getUserFields()) {
      obj[this.getUserFields()[item]['name']] = this.getUserFields()[item]['formBuilder'];
    }
    return obj;
  }

  async saveData(data: any, type:string) {
    if (type == 'user') {
      let obj = {};
      for (let item in data) {
        obj[item.toString()] = data[item];
      }

      // TODO: Refactor this to dynamically insert user data into the model by accepting an object
      // Factory pattern?
      let usr = new User(obj['name'], obj['surname'], obj['email'], obj['venue'], obj['cellNumber'], obj['marketing']);

      this.userService.saveUser(usr);
    } else if (type == 'prize') {
      this.prizeService.savePrize(data);
    }
  }

  exportData(type:string) {
    if (type === "users") {
      this.userService.exportUsers();
    }
  }

  clearData(type) {
    type === 'users' ? this.userService.clearUsers() : this.prizeService.clearPrizes()
    ;
  }
}
