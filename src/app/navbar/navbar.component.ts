import { Component, OnInit } from '@angular/core';
import { CartService } from '../_services/cart.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(
        private cartService: CartService
    ) { }

    ngOnInit() { }

    get cartCount(): number {
        return this.cartService.cartCount;
    }

    get hideCartIcon(): boolean {
        return this.cartService.hideCartIcon;
    }

    toggleCartVisibility() {
        this.cartService.toggleCartVisibility();
    }

}
