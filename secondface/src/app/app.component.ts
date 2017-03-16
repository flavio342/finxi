import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {

    platform.ready().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();

        let db = new SQLite();
        db.openDatabase({
            name: "data.db",
            location: "default"
        }).then(() => {
            db.executeSql("DROP TABLE videos", {}).then((data) => {
                console.log("TABLE DROPED: ", data);
            }, (error) => {
                console.error("Unable to execute sql", error);
            })
            db.executeSql("CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, localURL TEXT, fullPath TEXT, date LONG)", {}).then((data) => {
                console.log("TABLE CREATED: ", data);
            }, (error) => {
                console.error("Unable to execute sql", error);
            })
        }, (error) => {
            console.error("Unable to open database", error);
        });
      });

  }
}
