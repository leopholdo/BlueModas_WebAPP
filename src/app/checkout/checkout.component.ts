import { Component, OnInit } from '@angular/core';
import { Cart } from '../_models/cart';
import { Client } from '../_models/client';
import { CartService } from '../_services/cart.service';
import { ClientService } from '../_services/client.service';
import { CheckoutService } from '../_services/checkout.service';
import { OrderEntity } from '../_models/orderEntity';
import { ProductBasket } from '../_models/productBasket';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    orderResponseEntity: OrderEntity = new OrderEntity();
    client: Client = new Client();
    checkoutSuccess: boolean = false;

    constructor(
        private cartService: CartService,
        private clientService: ClientService,
        private checkoutService: CheckoutService,
    ) { }

    ngOnInit() {
        this.cartService.toggleHideCartIcon();
    }

    get listBasket(): Cart[] {
        return this.cartService.listBasket;
    }

    getClient(tclEmail: string) {
        return this.clientService.getClient(tclEmail.toLowerCase()).subscribe(clients => !clients || (this.client = clients));
    }

    completeCheckout() {
        var productBasketList: ProductBasket[] = [];

        this.listBasket.forEach(item => {
            productBasketList.push(new ProductBasket(item.product.tprID, item.product.tprPrice, item.quantity))
        });

        var orderEntity: OrderEntity = new OrderEntity(this.client, productBasketList);

        return this.checkoutService.completeCheckout(orderEntity).subscribe(response => this.orderResponseEntity = response);

    }

}
