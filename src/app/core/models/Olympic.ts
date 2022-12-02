// Interface for olympic country
import { Participation } from "./Participation"

export interface OlympicCountry {
    id : number,
    country : string,
    participations : Array<Participation>
}


