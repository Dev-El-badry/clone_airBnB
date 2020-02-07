import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offert-detial',
  templateUrl: './offert-detial.page.html',
  styleUrls: ['./offert-detial.page.scss'],
})
export class OffertDetialPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goBook() {
    this.navCtrl.navigateBack('places/tabs/discover');
  }

}
