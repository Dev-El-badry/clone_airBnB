import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../.../../../../environments/environment';
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) mapElementRef: ElementRef;
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps().then(
      googleModule => {
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleModule.Map(mapEl, {
          center: {lat: 29.845400, lng: 31.337151},
          zoom: 16
        });

        googleModule.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visiable');
        });

        map.addListener('click', (event) => {
          const select_coords = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };

          this.modalCtrl.dismiss(select_coords);
        })
      }
    ).catch(
      err => {
        console.log(err, 'error');
      }
    );
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key="+environment.googleMapApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google Maps SDK Not Available!');
        }
      };
    })
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}