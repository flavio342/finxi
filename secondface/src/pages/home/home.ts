import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CreateVideo } from '../create-video/create-video';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  presentModal() {
    let modal = this.modalCtrl.create(CreateVideo);
    modal.present();
  }

}