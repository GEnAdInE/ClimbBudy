import {AbstractData} from "@/data/abstract-data";

export class User extends AbstractData {

    keysToIgnore: string[] = ['id'];

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public center_id: string,
    ) {
        super();
    }
}