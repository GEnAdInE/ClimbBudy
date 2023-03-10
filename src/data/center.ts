import {Route} from "@/data/route";
import {AbstractData} from "@/data/abstract-data";

export class Center extends AbstractData {

    keysToIgnore: string[] = ['id', 'routes'];

    constructor(
        public id: string,
        public name: string,
        public address: GeolocationCoordinates,
        public website: string,
        public routes: Route[] = [],
    ) {
        super();
    }

}