import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/OlympicCountry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,OnDestroy {
  public olympics$!: Observable<[OlympicCountry]>;
  public arrayOlympics!: Array<OlympicCountry>;
  private suscribe!: Subscription;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics(); 
    this.arrayOlympics = [
      {
        "id": 1,
        "country": "Italy",
        "participations": [
          {
            "id": 1,
            "year": 2012,
            "city": "Londres",
            "medalsCount": 28,
            "athleteCount": 372
          },
          {
            "id": 2,
            "year": 2016,
            "city": "Rio de Janeiro",
            "medalsCount": 28,
            "athleteCount": 375
          },
          {
            "id": 3,
            "year": 2020,
            "city": "Tokyo",
            "medalsCount": 40,
            "athleteCount": 381
          }
        ]
      }];
    
    
    
  }
  ngOnDestroy(): void {
    
  }

  

  
}
