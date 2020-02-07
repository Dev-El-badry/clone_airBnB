import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadPlaces: Place[];
  constructor(private palceService: PlaceService) { }

  ngOnInit() {
    this.loadPlaces = this.palceService.Places;
  }

}
