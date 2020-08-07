import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import {IonItemSliding} from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  loadPlaces: Place[];
  placeSub: Subscription;
  isLoading: boolean = true;
  constructor(private palceService: PlaceService, private router: Router) { }

  ngOnInit() {
    this.placeSub = this.palceService.Places.subscribe(places => {
      this.loadPlaces = places;
    })
    
  }

  ionViewWillEnter() {
    this.palceService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(placeId: string, sliding: IonItemSliding) {
    sliding.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', placeId]);
    console.log("Editing Item", placeId);
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe();
  }

}
