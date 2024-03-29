import {Route} from "@/data/route";
import {User} from "@/data/user";
import {AbstractData} from "@/data/abstract-data";

export class Comment extends AbstractData {


    constructor(
        public id: string,
        public route: Route | undefined,
        public user: User | undefined,
        public subject: string,
        public date: string,

        public images: string[] = [],
        public blobimages: Blob[] = [],

    ) {
        super();
        this.keysToIgnore.push('id', 'route', 'user', 'blobimages');
    }

}