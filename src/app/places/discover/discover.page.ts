import { Component, OnInit } from '@angular/core';
import {SegmentChangeEventDetail} from '@ionic/core';
import { PlaceService } from '../place.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit {
  loadPlaces: Place[];
  relativePlaces: Place[];
  listedLoadedPlaces: Place[];
  isLoading: boolean;
  constructor(
    private placeService: PlaceService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.placeService.Places.subscribe(places => {
      this.loadPlaces = places;
      this.relativePlaces = this.loadPlaces;
      this.listedLoadedPlaces = this.relativePlaces.slice(1);
    });
    console.log(this.loadPlaces);
  }

  ionViewWillEnter() {
  
    this.placeService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  goOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    if(event.detail.value == 'all') {

      this.relativePlaces = this.loadPlaces;
      this.listedLoadedPlaces = this.relativePlaces.slice(1);

    } else {
      this.relativePlaces = this.loadPlaces.filter(place => {
        return place.userID === this.authService.userID;
      });
      this.listedLoadedPlaces = this.relativePlaces.slice(1);
    }
  }
}
