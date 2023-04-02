import {AbstractData} from "@/data/abstract-data";

export class User extends AbstractData {

    keysToIgnore: string[] = ['id'];

    constructor(
        public id: string,
        public username: string,
        public email: string,
        public center_id: string,
    ) {
        super();
    }
}