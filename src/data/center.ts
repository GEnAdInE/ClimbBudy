import {Route} from "@/data/route";
import {AbstractData} from "@/data/abstract-data";

export class Center extends AbstractData {


    constructor(
        public id: string,
        public name: string,
        public address: GeolocationCoordinates,
        public website: string,
        public routes: Route[] = [],
    ) {

        super();
        this.keysToIgnore.push('id', 'route');
    }

}