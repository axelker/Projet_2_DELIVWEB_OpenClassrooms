// Interface for olympic country
import { Participation } from "./Participation"

/**
 * Represents an Olympic country
 */
export interface OlympicCountry {
    id : number,
    country : string,
    participations : Array<Participation>
}


