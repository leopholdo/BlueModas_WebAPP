import { Component, OnInit } from '@angular/core';
import { Cart } from '../_models/cart';
import { CartService } from '../_services/cart.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    constructor(
        private cartService: CartService
    ) { }

    ngOnInit() { }

    get isCartVisible(): boolean {
        return this.cartService.isCartVisible;
    }

    get hideCartIcon(): boolean {
        return this.cartService.hideCartIcon;
    }

    get listBasket(): Cart[] {
        return this.cartService.listBasket;
    }

    get cartTotal(): number {
        return this.cartService.cartTotal;
    }

    removeProduct(item: Cart) {
        return this.cartService.removeProduct(item);
    }

    addProduct(item: Cart) {
        return this.cartService.addProduct(item);
    }

    toggleCartVisibility() {
        return this.cartService.toggleCartVisibility();
    }

    replaceCurrency(trpPrice: number) {
        return trpPrice.toString().replace('.', ',');
    }

}
