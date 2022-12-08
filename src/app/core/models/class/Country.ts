import { OlympicCountry } from "../interfaces/OlympicCountry";
import { Participation } from "../interfaces/Participation";
export class Country implements OlympicCountry {
    id : number;
    country : string;
    participations : Array<Participation>;

    constructor(id : number,country:string,participations:Array<Participation>){
        this.id=id;
        this.country=country;
        this.participations=participations;
    }

    public getId() : number{
        return this.id;
    }
    public getCountry() : string{
        return this.country;
    } 
    public getParticipations() : Array<Participation>{
        return this.participations;
    }
    

}