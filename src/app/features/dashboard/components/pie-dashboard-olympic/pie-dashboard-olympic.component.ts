import { Component, OnInit,Input, OnDestroy, } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/interfaces/OlympicCountry';
import OlympicCountryUtils from 'src/app/core/utils/OlympicCountryUtils';
import { Country } from 'src/app/core/models/class/Country';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { DataChart } from 'src/app/core/models/interfaces/DataChart';
import { LegendPosition } from '@swimlane/ngx-charts';
@Component({
  selector: 'app-pie-dashboard-olympic',
  templateUrl: './pie-dashboard-olympic.component.html',
  styleUrls: ['./pie-dashboard-olympic.component.scss']
})
export class PieDashboardOlympicComponent implements OnInit,OnDestroy {
  
  public arrayOlympics! : Array<OlympicCountry | null>;
  private suscribe!: Subscription;
  private olympics$!: Observable<[OlympicCountry] | undefined>;



  nbOfJOs : number | null = null;

  
  view!: [number,number];
  single!: Array<DataChart>;

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  

  constructor(private router : Router,private olympicService: OlympicService) {
    this.resizeChart(innerWidth / 1.3);
  }
  
  ngOnInit(): void {
    this.initDataArrayOlympics();
    Object.assign(this, this.single );
  }

  //init the data in array 
  initDataArrayOlympics() : void{
    this.olympics$ = this.olympicService.getOlympics(); 
    this.suscribe = this.olympics$.subscribe({      
      next: (olympicCountry: [OlympicCountry] | undefined) => {
        if(olympicCountry){
          this.arrayOlympics=olympicCountry;
          this.initPie();
        }
      },
      error: (err: Error) =>  { 
        this.arrayOlympics=[]; 
      },
    });
  }

  //Init the data of the pie chart 
  initPie() : void{
    this.single=[];
    //Array to add the number of JOs participation of each country
    let arrayNumberParticipation : Array<number> = [];
    for(let i=0;i<this.arrayOlympics.length;i++){
      arrayNumberParticipation.push(OlympicCountryUtils.getNbJOs(this.arrayOlympics[i]?.participations));
      this.single.push(
        { 
          "name" : "" + this.arrayOlympics[i]!.country,
          "value" : this.arrayOlympics[i]!.participations.reduce((total, participation) => total + participation.medalsCount,0)
        });
    }

    //Check if the country have the same JOs participation
    if(OlympicCountryUtils.checkSameParticipationCountry(arrayNumberParticipation)){
      this.nbOfJOs=arrayNumberParticipation[0];
    } 
    
  }
 

  


  onSelect(data : DataChart | string): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    let country : Country | undefined = undefined;

    //Check the type to get the country by name
    if(typeof data === "string"){
      country  = OlympicCountryUtils.getCountryByName(data,this.arrayOlympics);
    }
    else {
      country  = OlympicCountryUtils.getCountryByName(data.name,this.arrayOlympics);
    }
    
    //Routing to the country by her ID 
    if(country!=undefined){
      this.router.navigateByUrl('/country/'+country.getId());
    }
    
  }

  onActivate(data : any): void {
  }

  onDeactivate(data: any ): void {
  }

 

  ngOnDestroy(): void {
    this.suscribe.unsubscribe();
  }

  resizeChart(width : number){
    this.view = [width, 400];
    if( width<=600){
      this.showLegend=false;
    }
    if(width<700 && width>600){
      this.showLegend=true;
      this.legendPosition = LegendPosition.Right;
    }
    if(width>=700){
      this.showLegend=true;
      this.legendPosition = LegendPosition.Below;
    }
  }



}
