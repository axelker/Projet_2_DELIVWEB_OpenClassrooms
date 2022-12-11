import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Country } from 'src/app/core/models/class/Country';
import { DataChart } from 'src/app/core/models/interfaces/DataChart';
import { OlympicCountry } from 'src/app/core/models/interfaces/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-bar-dashboard-olympic',
  templateUrl: './bar-dashboard-olympic.component.html',
  styleUrls: ['./bar-dashboard-olympic.component.scss']
})
export class BarDashboardOlympicComponent implements OnInit,OnDestroy {

  country : OlympicCountry | null = null;
  nbParticipations : number | null = null;
  nbMedals : number | null = null;
  nbAthletes : number | null = null;
  multi: any[] = [];
   // options
   legend: boolean = false;
   showLabels: boolean = true;
   animations: boolean = true;
   xAxis: boolean = true;
   yAxis: boolean = true;
   showYAxisLabel: boolean = true;
   showXAxisLabel: boolean = true;
   xAxisLabel: string = 'Year';
   yAxisLabel: string = 'Medals count';
   timeline: boolean = true;
  private countrySuscribe!: Subscription;
  private routeSub!: Subscription;
  private idToSearch:number | null = null;



  view: [number,number] = [700, 300];

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private olympicService: OlympicService ) 
  {  
  }

  ngOnInit(): void {
    this.initIdToSearch();
    this.initCountry();
    Object.assign(this,  this.multi );


  }
  //Get the id of current country
  initIdToSearch() : void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      let id : number = Number(params['id']);
      if(id){
        this.idToSearch = id;
      }
    });
  }
  //Init the data of the country  
  initCountry() : void{
  
    this.countrySuscribe = this.olympicService.getOlympics().subscribe({
      next: (olympicCountry: [OlympicCountry] | undefined) => {
       // Filter on the id in parameter to found the country
        if(olympicCountry) {
          this.country = olympicCountry.filter(country => {
          return country.id==this.idToSearch;
        })[0];
        //Country not found redirect to home page
        if(!this.country){
          this.router.navigateByUrl("");
        }
        //Init the chart 
        else {
          this.initBarChart(this.country);
        }
      }
      },
      error: (err: Error) =>  { 
        this.country=null;
      },
    });
    
  }
  //Init the bart char with the data of country in parmeters
  initBarChart(country : OlympicCountry): void {
      let series : Array<DataChart> =[];
      let countMedals : number = 0;
      let countAthlets : number = 0;
      //Init the series in chart with participations JOs 
      for(let i =0;i<country.participations.length;i++){
        series.push({
          "name" : "" +country.participations[i].year,
          "value" :  country.participations[i].medalsCount
      });
        countMedals += country.participations[i].medalsCount;
        countAthlets+= country.participations[i].athleteCount;
      }
      //Init nb around charts
      this.nbMedals=countMedals;
      this.nbAthletes=countAthlets;
      this.nbParticipations=series.length;
     
      this.multi = [ {
        "name": country.country,
        "series": series
    }];
  
  }

 


  onSelect(data :any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data :any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data :any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  goBack(): void {
    this.router.navigate([".."]);
  }
  ngOnDestroy(): void {
    this.countrySuscribe.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
