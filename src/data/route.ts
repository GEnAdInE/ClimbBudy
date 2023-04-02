import {Comment} from "@/data/comment";
import {Center} from "@/data/center";
import {AbstractData} from "@/data/abstract-data";
import {DifficultyPerCategory} from "@/data/difficulty-per-category";

export class Route extends AbstractData {


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
        public difficultyPerCategory: DifficultyPerCategory[] = Route.defaultDifficultyPerCategory,



        public card: string[] = [],
    ) {
        super();
        this.keysToIgnore.push('id', 'center', 'comments');

    }

    static defaultDifficultyPerCategory: DifficultyPerCategory[] = [
        new DifficultyPerCategory('Technique', 50),
        new DifficultyPerCategory('Resistance', 50),
        new DifficultyPerCategory('Morpho', 50),
        new DifficultyPerCategory('Dynamics', 50),
    ];

    getCleanDataObject(): any {
        const cleaned = super.getCleanDataObject();
        cleaned.difficultyPerCategory = JSON.stringify(this.difficultyPerCategory);
        return cleaned;
    }

    static defaultDifficultyPerCategory: DifficultyPerCategory[] = [
        new DifficultyPerCategory('Technique', 50),
        new DifficultyPerCategory('Resistance', 50),
        new DifficultyPerCategory('Morpho', 50),
        new DifficultyPerCategory('Dynamics', 50),
    ];

    getCleanDataObject(): any {
        const cleaned = super.getCleanDataObject();
        cleaned.difficultyPerCategory = JSON.stringify(this.difficultyPerCategory);
        return cleaned;
    }
}