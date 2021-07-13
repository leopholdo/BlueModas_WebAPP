import { Client } from "./client";
import { Order } from "./order";
import { ProductBasket } from "./productBasket";

export class OrderEntity {
    constructor(
        public client: Client = new Client(),
        public productBasketList: ProductBasket[] = [],
        public order?: Order
    ) { }
}