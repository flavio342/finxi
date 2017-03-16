import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls:['assets/css/about.css']
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

}
