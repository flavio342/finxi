import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CreateVideo } from '../create-video/create-video';

import {SQLite} from "ionic-native";
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public database:SQLite;
  public videos:Array<Object>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public platform:Platform) {
    this.platform.ready().then(() => {
        this.database = new SQLite();
        this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.refreshVideos();
        }, (error) => {
            console.log("ERROR: ", error);
        });
    });
  }

   refreshVideos() {
      this.database.executeSql("SELECT * FROM videos", []).then((data) => {
          this.videos = [];
          if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                  this.videos.push({description: data.rows.item(i).description});
              }
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });
      console.log("refreshed");
    }

  ngOnInit(){
      //this.refreshVideos();
      console.log("has inited")
  }

 

  presentModal() {
    let modal = this.modalCtrl.create(CreateVideo);
    modal.present();
  }

}