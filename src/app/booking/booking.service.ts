import {Injectable} from '@angular/core';
import {Booking} from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { take, delay, tap, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

interface BookingData {
  dateFrom: string;
  dateTo: string;
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeTitle: string;
  userId: string;
}

@Injectable({
  providedIn: "root"
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);
  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

    get Bookings() {
      return this._bookings.asObservable();
    }

    fetchBookings() {
      return this.http.get<{[key: string]: BookingData}>(`https://pairbnb-bdb43.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userID}"`)
              .pipe(
                map (bookingData => {
                  let bookings = [];
                  for(const key in bookingData ) {

                    bookings.push(

                      new Booking(
                        key,
                        bookingData[key].placeId,
                        bookingData[key].userId,
                        bookingData[key].placeTitle,
                        bookingData[key].guestNumber,
                        bookingData[key].firstName,
                        bookingData[key].lastName,
                        new Date(bookingData[key].dateFrom),
                        new Date(bookingData[key].dateTo)
                      )
                    );

                  }

                  return bookings;
                }),
                tap(bookings => {
                  this._bookings.next(bookings);
                })
              )
    }

    addBooking(
      bookingId: string,
      placeId: string,
      userId: string,
      placeTitle: string,
      guestNumber: number,
      firstName: string,
      lastName: string,
      dateTo: Date,
      dateFrom: Date
    ){
      let generatedId;
      const newBooking = new Booking(
        bookingId,
        placeId,
        userId,
        placeTitle,
        guestNumber,
        firstName,
        lastName,
        dateTo,
        dateFrom
      );

      return this.http.post<{name: string}>('https://pairbnb-bdb43.firebaseio.com/bookings.json', {...newBooking, id: null})
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.Bookings;
        }),
        take(1),
        tap(
          bookings => {
            newBooking.id = generatedId;
            this._bookings.next(bookings.concat(newBooking));
          }
        )
      )

      return this._bookings.pipe(take(1), delay(1000), tap(bookings=> {
        this._bookings.next(bookings.concat(newBooking));
      }));

    }

    cancelBooking(bookingId: string) {
      return this.http.delete(`https://pairbnb-bdb43.firebaseio.com/bookings/${bookingId}.json`)
        .pipe(
          switchMap(resData => {
            return this.Bookings;
          }),
          take(1),
          tap((bookings) => {
            const newBookgins = bookings.filter(b =>  b.id !== bookingId);          
            this._bookings.next(newBookgins);
          })
        );
    }

    // updateBooking(

    // )
}