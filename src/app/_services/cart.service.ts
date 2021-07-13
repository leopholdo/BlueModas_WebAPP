import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { Subject } from 'rxjs';
import { Cart } from '../_models/cart';

@Injectable({ providedIn: 'root' })
export class CartService {

    listBasket: Cart[] = [];
    listBasketChange: Subject<Cart[]> = new Subject<Cart[]>();

    cartCount: number = 0;
    cartCountChange: Subject<number> = new Subject<number>();

    cartTotal: number = 0;
    cartTotalChange: Subject<number> = new Subject<number>();

    isCartVisible: boolean = false;
    isCartVisibleChange: Subject<boolean> = new Subject<boolean>();

    hideCartIcon: boolean = false;
    hideCartIconChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.cartCountChange.subscribe((val) => {
            this.cartCount = val;
            this.cartTotalChange.next();
        });

        this.cartTotalChange.subscribe(() => {
            this.cartTotal = this.listBasket.reduce((sum: number, b: Cart) => sum + b.total, 0);
        });

        this.isCartVisibleChange.subscribe((val) => {
            this.isCartVisible = val;
        });

        this.hideCartIconChange.subscribe((val) => {
            this.hideCartIcon = val;
        });

        this.listBasketChange.subscribe((list) => {
            this.listBasket = list;
        });
    }

    toggleCartVisibility() {
        this.isCartVisibleChange.next(!this.isCartVisible);
    }

    toggleHideCartIcon() {
        this.hideCartIconChange.next(!this.hideCartIcon);
    }

    addToCart(item: Product) {
        var listCurrentProduct = this.listBasket.filter(x => x.product.tprID == item.tprID);

        if (listCurrentProduct.length > 0) {
            var quantity = listCurrentProduct[0].quantity + 1

            listCurrentProduct[0].quantity = quantity;
            listCurrentProduct[0].total = listCurrentProduct[0].product.tprPrice * quantity;

        } else {
            var productObj: Cart = new Cart(item, 1, item.tprPrice);

            this.listBasket.push(productObj);
            this.listBasketChange.next(this.listBasket);
        }

        this.cartCountChange.next(this.cartCount + 1);
    }

    removeProduct(item: Cart) {
        var index = this.listBasket.map(x => x.product.tprID).indexOf(item.product.tprID);

        this.listBasket[index].total = this.listBasket[index].total - this.listBasket[index].product.tprPrice;

        if (this.listBasket[index].quantity == 1) {
            this.listBasket.splice(index, 1);
        } else {
            this.listBasket[index].quantity--;
        }

        this.cartCountChange.next(this.cartCount - 1);
        this.listBasketChange.next(this.listBasket);
    }

    addProduct(item: Cart) {
        var index = this.listBasket.map(x => x.product.tprID).indexOf(item.product.tprID);

        this.listBasket[index].quantity++;
        this.listBasket[index].total = this.listBasket[index].product.tprPrice * this.listBasket[index].quantity;

        this.cartCountChange.next(this.cartCount + 1);
        this.listBasketChange.next(this.listBasket);
    }

}
