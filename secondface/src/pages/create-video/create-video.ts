import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import {SQLite} from "ionic-native";
import {Platform} from 'ionic-angular';

@Component({
  selector: 'create-video',
  templateUrl: 'create-video.html',
  styles:[`
    ion-title{
    padding: 10px;
    }
  `]
})

export class CreateVideo {

  public database:SQLite;
  public videos:Array<Object>;

  constructor(public viewCtrl: ViewController, public platform:Platform) {
    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            
        }, (error) => {
            console.log("ERROR: ", error);
        });
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  createVideo(formData){
    if(formData.valid){
      this.database.executeSql("INSERT INTO videos (description) VALUES ('oi')", []).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
      });
    }
  }

}