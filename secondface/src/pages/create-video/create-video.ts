import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController) {
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
}