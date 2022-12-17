import { Country } from "../models/class/Country";
import { OlympicCountry } from "../models/interfaces/OlympicCountry";
import { Participation } from "../models/interfaces/Participation";

export default class OlympicCountryUtils {
  
    // Get the number of country
    static getNbCountry(arrayOlympics : Array<OlympicCountry>) : number {
        return arrayOlympics.length;
    }
    // Get the number of jos for the participation of on Country
    static getNbJOs(participation : Array<Participation>| undefined): number {
        return participation==undefined? 0 : participation.length;
    }

    //Check if the country have the same JOs participation
    static checkSameParticipationCountry(arrayNumberParticipation : Array<number>) : boolean {
        return arrayNumberParticipation.every( v => v === arrayNumberParticipation[0]);
    }
    // Get country by name
    static getCountryByName(name : String,arrayOlympicCountry : Array<OlympicCountry | null>) : Country | undefined {
        for(let i =0;i<arrayOlympicCountry.length;i++){
            //olympicCoutry : OlympicCountry;
            if( name===arrayOlympicCountry[i]?.country){
                return new Country(arrayOlympicCountry[i]!.id,arrayOlympicCountry[i]!.country,arrayOlympicCountry[i]!.participations);
            }
        } 
        return undefined;

    } 
    
    
}