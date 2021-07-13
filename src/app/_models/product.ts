export class Product {
    constructor(
        public tprName: string,
        public tprPrice: number,
        public tprImage: string,
        public tprID?: number,
    ) { }
}