import { OlympicCountry } from "../interfaces/OlympicCountry";
import { Participation } from "../interfaces/Participation";

/**
 * Country based implementation of the OlympicCountry interface
 * 
 */
export class Country implements OlympicCountry {
    id : number;
    country : string;
    participations : Array<Participation>;

    /**
     * @param {number} id  The id of the country
     * @param {string} country  The name of the country
     * @param {Array<Participation>} participations Array of participations in the olympic games
     */
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