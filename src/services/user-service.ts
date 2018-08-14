import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Platform } from "ionic-angular";

// TODO: Separate out the provider for user and prize data
// Structure providers and services better based on definitions of each:
// https://www.joshmorony.com/when-to-use-providersservicesinjectables-in-ionic/

@Injectable()
export class UserService {
  users: Array<User>;
  storageFolder: string;
  csvFile: string;
  fileBlob: Blob;

  constructor(
    public platform: Platform,
    private storage: Storage,
    private file: File
  ) {
    if (platform.is("ios")) this.storageFolder = file.documentsDirectory;
    else if (platform.is("android")) this.storageFolder = file.dataDirectory;
  }

  async initialise() {
    this.storage.get("users").then((value: Array<User>) => {
      value.length === 0 ? (this.users = []) : (this.users = value);
    });
  }

  getUsers(): Array<User> {
    return this.users;
  }

  async saveUser(data) {
    this.users = await this.storage.get("users");
    this.users.push(data);
    this.storage.set("users", this.users);
  }

  exportUsers() {
    this.csvFile = this.convertToCSV(this.users);

    // TODO: add environment variables during build to prevent this from running in simulated device in browser
    if (this.platform.is("mobile")) {
      this.fileBlob = new Blob([this.csvFile], { type: "text/csv" });
      this.file
        .writeFile(this.storageFolder, "users.csv", this.fileBlob)
        .then(value => {
          console.log(value);
        });
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
