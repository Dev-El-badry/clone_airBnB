import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Place } from "../../place.model";
import { PlaceService } from "../../place.service";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
  form: FormGroup;
  place: Place;
  constructor(
    private placeServie: PlaceService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log("HERE");
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
      }
      this.place = this.placeServie.getPlace(paramMap.get("placeId"));

      this.createForm(this.place);
    });
  }

  createForm(place) {
    this.form = new FormGroup({
      title: new FormControl(place.title, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(place.description, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  onAfterUpdate() {
    if(!this.form.valid)
      return;
    
    console.log("Update Offer");
  }
}
