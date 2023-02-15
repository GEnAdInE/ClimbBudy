import {Route} from "@/data/route";

export class Center {
    constructor(
        public id : string,
        public name: string,
        public address: GeolocationCoordinates,
        public website: string,
        public routes: Route[] = [],
    ) {}
}