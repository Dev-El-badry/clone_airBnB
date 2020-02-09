import { Component, OnInit } from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';
import { PlaceService } from '../place.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit {
  loadPlaces: Place[];
  listedLoadedPlaces: Place[];
  constructor(
    private placeService: PlaceService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadPlaces = this.placeService.Places;
    this.listedLoadedPlaces = this.placeService.Places.slice(1);
    console.log(this.loadPlaces);
  }

  goOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
