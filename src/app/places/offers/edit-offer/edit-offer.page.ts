import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Place } from "../../place.model";
import { PlaceService } from "../../place.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, LoadingController, AlertController } from "@ionic/angular";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  placeSub: Subscription;
  isLoading: boolean;
  placeId: number;
  constructor(
    private placeServie: PlaceService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
      }
      this.placeId = Number(paramMap.get('placeId'));
      
     this.placeSub = this.placeServie.getPlace(paramMap.get("placeId")).subscribe(place => {
        this.place = place;
        
        this.createForm(this.place);
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create(
          {
            header: 'An Error Ocurred',
            message: 'Place could not be fetched. please try again later',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/', 'places', 'tabs', 'offers']);
                }
              }
            ]
          }
        ).then(alertEl => {
          alertEl.present();
        })
      });

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

    this.loadingCtrl.create({
      message: 'Updating Place...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.placeServie.updatePlace(this.place.id, this.form.value.title, this.form.value.description)
                      .subscribe(res => {
                        this.loadingCtrl.dismiss();
                        this.form.reset();
                        this.router.navigate(['/places/tabs/offers']);
                      });
    });
  }

  ngOnDestroy() {
    if(this.placeSub) this.placeSub.unsubscribe();
  }
}
