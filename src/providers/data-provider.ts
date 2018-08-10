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

  async saveData(data: any, ratio:number = 5) {
    if (data instanceof User) {
      this.userService.saveUser(data);
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
