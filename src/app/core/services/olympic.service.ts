import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/interfaces/OlympicCountry';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<[OlympicCountry] | undefined>(undefined);

  constructor(private http: HttpClient) {}
  /**
   * Load the inital data in the json file 
   * and set the value of the olypic beahviour attribut.
   * @returns observable of an olymic country
   */
  public loadInitialData() : Observable<[OlympicCountry]>  {
    return this.http.get<[OlympicCountry]>(this.olympicUrl).pipe(
      tap((value : [OlympicCountry]) => { 
        this.olympics$.next(value); 
      }),
      
    );
  }
 
  public getOlympics() : Observable<[OlympicCountry] | undefined> {
    return this.olympics$.asObservable();
  }

  

}
