import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { observable, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {

   }

   /* DEVOLVER CANCIONES TRENDING */ 

   getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)

    .pipe(
      map(({data}: any) =>{
        return data
      })
    )
   }

   /* DEVOLVER CANCIONES RANDOM */ 

   getAllRandom$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)

    .pipe(
      map(({data}: any) =>{
        return data
      }),
      catchError((err) =>{
        return of([])
      })
    )
   }


}
