import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/interfaces/OlympicCountry';

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
    this.suscribe = this.olympics$.subscribe({      
      next: (olympicCountry: [OlympicCountry]) => {
        this.arrayOlympics=olympicCountry;
      },
      error: (err: Error) =>  { 
        this.arrayOlympics=[]; 
      },
    });
    
    
    
  }
  ngOnDestroy(): void {
    this.suscribe.unsubscribe();
  }

  

  
}
