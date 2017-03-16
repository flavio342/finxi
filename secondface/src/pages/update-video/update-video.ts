import { Component } from '@angular/core';

import {SQLite} from "ionic-native";
import {Platform} from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { NavParams } from 'ionic-angular';

@Component({
  selector: 'update-video',
  templateUrl: 'update-video.html',
  styles:[`
    ion-title{
    padding: 10px;
    }
  `]
})

export class UpdateVideo {

  public video:any;

  public database:SQLite;
  public videos:Array<Object>;

  constructor(public platform:Platform, public navCtrl: NavController,private navParams: NavParams) {
    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            
        }, (error) => {
            console.log("ERROR: ", error);
        });
    });
    console.log(navParams);
    this.video = {
      id: navParams.get('id'),
      description: navParams.get('description')
    }
  }

  updateVideo(video){
   
    this.database.executeSql("UPDATE videos SET description = '" + video.description + "' WHERE id =" + video.id, []).then((data) => {
          console.log("UPDATED: " + JSON.stringify(data));
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error.err));
    });
 
    this.navCtrl.pop();
  }

}