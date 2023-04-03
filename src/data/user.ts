import {AbstractData} from "@/data/abstract-data";

export class User extends AbstractData {

    keysToIgnore: string[] = ['id', 'email'];

    constructor(
        public id: string,
        public username: string,
        public email: string,
        public role: string = "grimpeur",
        public center_id: string = "",

    ) {
        super();
    }
}