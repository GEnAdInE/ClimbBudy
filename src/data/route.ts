export class Route{
    constructor(
        public id : string,
        public name: string,
        public description: string = "Descriptiion will be here",
        public difficulty: string = "7A",
        public center_id: string,
        public tips: string = "Tip will be here",
        public icon: string = "🔥",
        public author: string = "Ouvreur 1",
        public location: string = "7",
        public color: string = "warning",
    ) {}
}