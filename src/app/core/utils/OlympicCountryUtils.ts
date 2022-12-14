import { Country } from "../models/class/Country";
import { OlympicCountry } from "../models/interfaces/OlympicCountry";
import { Participation } from "../models/interfaces/Participation";

export default class OlympicCountryUtils {
  
    /**
     * Get the number of countries
     * @param {Array<OlympicCountry>} arrayOlympics array of countries
     * @returns 
     */
    static getNbCountry(arrayOlympics : Array<OlympicCountry>) : number {
        return arrayOlympics.length;
    }
    /**
     * Get the number of JOs for the participation of a Country
     * @param participation 
     * @returns 
     */
    static getNbJOs(participation : Array<Participation>| undefined): number {
        return participation==undefined? 0 : participation.length;
    }

    /**
     * Check if the coutries have the same JOs participation
     * @param arrayNumberParticipation 
     * @returns 
     */
    static checkSameParticipationCountry(arrayNumberParticipation : Array<number>) : boolean {
        return arrayNumberParticipation.every( v => v === arrayNumberParticipation[0]);
    }
    /**
     * Get a country by her name
     * @param name 
     * @param arrayOlympicCountry 
     * @returns 
     */
    static getCountryByName(name : String,arrayOlympicCountry : Array<OlympicCountry | null>) : Country | undefined {
        for(let i =0;i<arrayOlympicCountry.length;i++){
            if( name===arrayOlympicCountry[i]?.country){
                return new Country(arrayOlympicCountry[i]!.id,arrayOlympicCountry[i]!.country,arrayOlympicCountry[i]!.participations);
            }
        } 
        return undefined;

    } 
    
    
}