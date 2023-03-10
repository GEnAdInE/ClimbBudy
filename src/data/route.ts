import {Comment} from "@/data/comment";
import {Center} from "@/data/center";
import {AbstractData} from "@/data/abstract-data";

export class Route extends AbstractData {

    keysToIgnore: string[] = ['id', 'center', 'comments'];

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public difficulty: string,
        public center: Center | undefined,
        public tips: string,
        public icon: string,
        public author: string,
        public location: string,
        public color: string,
        public comments: Comment[] = [],
    ) {
        super();
    }
}