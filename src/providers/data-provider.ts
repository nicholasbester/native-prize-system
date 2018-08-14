import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { Prize } from "../models/Prize";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Platform } from "ionic-angular";
import { UserService } from "../services/user-service";
import { PrizeService } from "../services/prize-service";

// TODO: Separate out the provider for user and prize data
// Structure providers and services better based on definitions of each:
// https://www.joshmorony.com/when-to-use-providersservicesinjectables-in-ionic/

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

  async saveData(data: any, ratio:number = 5) {
    if (data instanceof Object) {
      let obj = {};
      for (let item in data) {
        obj[item.toString()] = data[item];
      }

      // TODO: Refactor this to dynamically insert user data into the model by accepting an object
      // Factory pattern?
      let usr = new User(obj['name'], obj['surname'], obj['email'], obj['cellNumber'], obj['marketing']);
      
      this.userService.saveUser(usr);
    } else if (data instanceof Prize) {
      this.prizeService.savePrize(data, ratio);
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
