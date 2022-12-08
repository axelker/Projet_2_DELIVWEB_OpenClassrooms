import { Component, OnInit,Input, } from '@angular/core';
import { OlympicCountry } from 'src/app/core/models/interfaces/OlympicCountry';
import OlympicCountryUtils from 'src/app/core/utils/OlympicCountryUtils';
import { Country } from 'src/app/core/models/class/Country';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pie-dashboard-olympic',
  templateUrl: './pie-dashboard-olympic.component.html',
  styleUrls: ['./pie-dashboard-olympic.component.scss']
})
export class PieDashboardOlympicComponent implements OnInit {
  @Input()
  arrayOlympics! : Array<OlympicCountry | null>;

  nbOfJOs : number | null = null;

  
  view: [number,number] = [900,400];
  single!: Array<any>;

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  

  constructor(private router : Router) {
    
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
          "name" : this.arrayOlympics[i]?.country,
          "value" : this.arrayOlympics[i]?.participations.reduce((total, participation) => total + participation.medalsCount,0)
        });
    }

    //Check if the country have the same JOs participation
    if(OlympicCountryUtils.checkSameParticipationCountry(arrayNumberParticipation)){
      this.nbOfJOs=arrayNumberParticipation[0];
    } 
    
  }
 

  


  onSelect(data : any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    //ROUTING VERS ID 
    let country : Country | undefined = OlympicCountryUtils.getCountryByName(data.name,this.arrayOlympics);
    
    if(country!=undefined){
      console.log(country);
      this.router.navigateByUrl('/country/'+country.getId());
    }
    
  }

  onActivate(data : any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any ): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.initPie();
    Object.assign(this, this.single );
  }

}
