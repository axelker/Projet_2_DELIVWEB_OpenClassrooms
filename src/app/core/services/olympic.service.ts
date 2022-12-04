import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/OlympicCountry';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  public loadInitialData() : Observable<[OlympicCountry]>  {
    return this.http.get<[OlympicCountry]>(this.olympicUrl).pipe(
      tap((value : [OlympicCountry]) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  public getOlympics() : Observable<[OlympicCountry]> {
    return this.olympics$.asObservable();
  }

  

}
