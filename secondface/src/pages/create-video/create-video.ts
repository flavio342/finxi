import { Component } from '@angular/core';

import {SQLite} from "ionic-native";
import {Platform} from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { MediaCapture } from 'ionic-native';

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

  description:any;
  localURL:any;
  fullPath:any;
  date:any;
  
  public database:SQLite;

  constructor(public platform:Platform, public navCtrl: NavController) {
    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            
        }, (error) => {
            console.log("ERROR: ", error);
        });
        
    });

    
  }

  createVideo(){
    console.log("INSERT INTO videos (description,localURL,fullPath) VALUES ('" + this.description + "','" + this.localURL + "','" + this.fullPath + "')")
    this.database.executeSql("INSERT INTO videos (description,localURL,fullPath,date) VALUES ('" + this.description + "','" + this.localURL + "','" + this.fullPath + "','" + this.date + "')", []).then((data) => {
          console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error.err));
    });
    this.navCtrl.pop();

    
  }

  setVideo(videoData){
    this.localURL = videoData[0].localURL;
    this.fullPath = videoData[0].fullPath;
    this.date = videoData[0].lastModifiedDate;
  }


  startrecording() {
    MediaCapture.captureVideo({
      limit:1,
      duration:1
    }).then( (videoData) => this.setVideo(videoData) , function(err) {
      
    });
  }

}