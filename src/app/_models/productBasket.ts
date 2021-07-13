import { Product } from "./product";

export class ProductBasket {
    constructor(
        public tpbtprID?: number,
        public tpbPriceUnity?: number,
        public tpbQuantity: number = 0,
        public tpbtorID?: number,
        public tpbID?: number,
        public tabProduct: Product = new Product('', 0, '')
    ) { }
}