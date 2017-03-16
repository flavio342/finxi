import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { CreateVideo } from '../create-video/create-video';
import { UpdateVideo } from '../update-video/update-video';

import {SQLite} from "ionic-native";
import {Platform} from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { Camera } from 'ionic-native';

import {ViewChild} from '@angular/core'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls:['assets/css/home.css']
})
export class HomePage {

  public database:SQLite;
  public videos:Array<Object>;

  @ViewChild('myvideo') myVideo: any;

  constructor(public navCtrl: NavController,public platform:Platform, public alertCtrl: AlertController) {
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
                  this.videos.push({id: data.rows.item(i).id, description: data.rows.item(i).description, localURL: data.rows.item(i).localURL, fullPath: data.rows.item(i).fullPath, date: data.rows.item(i).date});
              }
              this.videos.reverse();
          }
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error));
      });
      console.log("refreshed");
    }

  ionViewDidEnter(){
      this.refreshVideos();
      console.log("has inited")
  }

 

  pushCreate() {
    this.navCtrl.push(CreateVideo);
  }

  pushUpdate(video) {
    this.navCtrl.push(UpdateVideo, video);
  }

  deleteVideoPopUp(video) {
      console.log(video.id);
    let confirm = this.alertCtrl.create({
      title: "Delete video " + video.id + "?",
      message: 'Do you really want to delete this video?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.deleteVideo(video);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteVideo(video){
    this.database.executeSql("DELETE FROM videos WHERE id IN (" + video.id + ")", []).then((data) => {
            console.log("DELETED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
      });
      this.refreshVideos();
  }

  selectvideo() {
    let video = this.myVideo.nativeElement;
    var options = {
      sourceType: 2,
      mediaType: 1
    };
 
    Camera.getPicture(options).then((data) => {
      video.src = data;
      video.play();
    })
  }

}