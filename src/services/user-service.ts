import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Platform } from "ionic-angular";
import { Device } from '@ionic-native/device';

@Injectable()
export class UserService {
  users: Array<User>;
  storageFolder: string;
  csvFile: string;
  fileBlob: Blob;

  constructor(
    public platform: Platform,
    private storage: Storage,
    private file: File,
    private device: Device
  ) {
    if (platform.is("ios")) this.storageFolder = file.documentsDirectory;
    else if (platform.is("android")) {
      // Using the defined values on Android tablets never helps
      this.storageFolder = 'file:///storage/emulated/0/Download';
    }
  }

  async initialise() {
    this.storage.get("users").then((value: Array<User>) => {
      if (value) value.length === 0 ? (this.users = []) : (this.users = value);
    }).then(() => {
      this.storage.get('venue').then((value:string) => {
        if (value) User.VENUE = value
        else {
          User.VENUE = 'None';
          this.saveVenue(User.VENUE);
        }
      });
    });
  }

  getUsers(): Array<User> {
    return this.users;
  }

  async saveUser(data) {
    if (this.users) this.users = await this.storage.get("users");
    else this.users = [];
    this.users.push(data);
    this.storage.set("users", this.users);
  }

  getVenue():string {
    return User.VENUE
  }

  async saveVenue(data) {
    User.VENUE = data;

    await this.storage.set('venue', User.VENUE);
  }

  exportUsers() {
    this.csvFile = this.convertToCSV(this.users);

    // TODO: add environment variables during build to prevent this from running in simulated device in browser
    if (this.device.platform == "Android") {
      this.fileBlob = new Blob([this.csvFile], { type: "text/csv" });
      this.file
        .writeFile(this.storageFolder, "users.csv", this.fileBlob, {replace: true} )
        .then(success => {
          console.log("File write success : " + success.toString(), success.toString())
        },
        error => {
          console.log(" Write file error  : " + error.toString(), error.toString() )
        })
    } else {
      console.log(this.csvFile);
    }
  }

  clearUsers() {
    this.users = [];
    this.storage.set("users", []);
  }

  convertToCSV(objArray): string {
    let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";
    let row = "";
    for (let index in objArray[0]) {
      row += index + ",";
    }
    row = row.slice(0, -1);
    str += row + "\r\n";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  }
}
