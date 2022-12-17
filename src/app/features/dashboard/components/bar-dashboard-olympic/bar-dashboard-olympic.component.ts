import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataChart } from 'src/app/core/models/interfaces/DataChart';
import { OlympicCountry } from 'src/app/core/models/interfaces/OlympicCountry';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-bar-dashboard-olympic',
  templateUrl: './bar-dashboard-olympic.component.html',
  styleUrls: ['./bar-dashboard-olympic.component.scss']
})
export class BarDashboardOlympicComponent implements OnInit,OnDestroy {
  
  private countrySuscribe!: Subscription;
  private routeSub!: Subscription;
  private idToSearch:number | null = null;
  country : OlympicCountry | null = null;
  nbParticipations : number | null = null;
  nbMedals : number | null = null;
  nbAthletes : number | null = null;
  
  // attributs of charts 
  multi: any[] = [];
  view!: [number,number];
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
  
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private olympicService: OlympicService ) 
  {  
    this.resizeChart(window.innerWidth / 1.3);
  }

  ngOnInit(): void {
    this.initIdToSearch();
    this.initCountry();
    Object.assign(this,  this.multi );


  }
  //Get the id of current country by the params in route
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

  goBack(): void {
    this.router.navigate([".."]);
  }
  ngOnDestroy(): void {
    this.countrySuscribe.unsubscribe();
    this.routeSub.unsubscribe();
  }

  resizeChart(width : number){
    this.view = [width, 400];
  }

}
