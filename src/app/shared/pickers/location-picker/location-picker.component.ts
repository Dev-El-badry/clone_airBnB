import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import {PlaceInfo} from '../../../places/Location.model';
import { of } from 'rxjs';
@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  selectLocationImage: string;
  isLoading: boolean;
  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create(
      {
        component: MapModalComponent
      }
    ).then(modalEl => {
      modalEl.onDidDismiss().then(resData => {
        this.isLoading = true;
        let pickedLocation: PlaceInfo = {
          lat: resData.data.lat,
          lng: resData.data.lng,
          address: null,
          googleMapStaticImageUrl: null
        };
 
        this.getAddress(resData.data.lat, resData.data.lng)
        .pipe(
          switchMap(address => {
            pickedLocation.address = address;
            return of(this.getMapStatic(pickedLocation.lat, pickedLocation.lng, 14));
          })
        ).subscribe(staticMapImageUrl => {
          pickedLocation.googleMapStaticImageUrl = staticMapImageUrl;
          this.selectLocationImage = pickedLocation.googleMapStaticImageUrl;
          this.isLoading = false;
        })

      });
      modalEl.present();
    });

  }

  private getAddress(lat: number, lng: number) {
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapApiKey}`)
    .pipe(
      map(geoData => {
        if(!geoData.results || !geoData || geoData.results.length === 0) {
          return null;
        }

        return geoData.results[0].formatted_address;
      })
    )
  }

  private getMapStatic(lat: number, lng: number, zoom: number) {
    console.log(lat, lng, zoom);
    


    // return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    // &markers=color:blue%7Clabel:Place%7C${lat},${lng}
    // &key=${environment.googleMapApiKey}`;


    return 'http://maps.googleapis.com/maps/api/staticmap?center=0.0000,0.0000&zoom=13&size=200x200&maptype=roadmap&markers=0.0000,0.0000&sensor=false&key='+environment.googleMapApiKey;
  }

}
