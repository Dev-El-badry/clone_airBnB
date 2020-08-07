import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageURL: string;
  price: number;
  title: string;
  userID: string;
}

@Injectable({
  providedIn: "root"
})
export class PlaceService {

  private _place = new BehaviorSubject<Place[]>([]);

  constructor(private http: HttpClient) {
  }

  get Places() {
    return this._place.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{[key: string]: PlaceData}>('https://pairbnb-bdb43.firebaseio.com/offered-places.json')
    .pipe(map(resData => {
        let places = [];
        for (const key in resData) {
          if(resData.hasOwnProperty(key)) {
            places.push(new Place(key, resData[key].title, resData[key].description, resData[key].imageURL, resData[key].price, new Date(resData[key].availableFrom), new Date(resData[key].availableTo), resData[key].userID))
          }
        }

        return places;
      }),
      tap(places => {
        this._place.next(places);
      })
    )
  }

  getPlace(id: string) {

    return this.http.get<PlaceData>(`https://pairbnb-bdb43.firebaseio.com/offered-places/${id}.json`)
    .pipe(
      map(placeData => {
        return new Place(id, placeData.title, placeData.description, placeData.imageURL, placeData.price, new Date(placeData.availableFrom), new Date(placeData.availableTo), placeData.userID);
      })
    )
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    userID: string
  ) {
    let generateId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg",
      price,
      dateFrom,
      dateTo,
      userID
    );


      return this.http.post<{name: string}>('https://pairbnb-bdb43.firebaseio.com/offered-places.json', {...newPlace, id: null})
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.Places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generateId;
          this._place.next(places.concat(newPlace));
        })
      ).subscribe();
      // this.Places.pipe(take(1)).subscribe(places => {
      //   this._place.next(places.concat(newPlace));
      // });
  }

  updatePlace(id: string, title: string, description: string) {
    let updatePlaces = [];
     return this.Places.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatePlaceIndex = places.findIndex(el => el.id == id);
        updatePlaces = [...places];
        const oldUpdatePlace = updatePlaces[updatePlaceIndex];
  
        updatePlaces[updatePlaceIndex] = new Place(id, title, description, oldUpdatePlace.imageURL, oldUpdatePlace.price, oldUpdatePlace.availableFrom, oldUpdatePlace.availableTo, oldUpdatePlace.userID);
        
        return this.http.put(`https://pairbnb-bdb43.firebaseio.com/offered-places/${id}.json`, {...updatePlaces[updatePlaceIndex], id: null});
      }),
      tap(() => {
       this._place.next(updatePlaces);
      }) 
    )
  }
}
