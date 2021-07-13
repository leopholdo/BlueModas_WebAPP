import { Component, OnInit } from '@angular/core';
import { ProductBasket } from '../_models/productBasket';
import { Output, EventEmitter } from '@angular/core';
import { CartService } from '../_services/cart.service';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    @Output() onQuantityChanged = new EventEmitter<number>();

    listProducts: Product[] = [];
    listBasket: ProductBasket[] = [];

    constructor(
        private cartService: CartService,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.productService.getProducts().subscribe(products => this.listProducts = products);
    }

    replaceCurrency(trpPrice: number) {
        return trpPrice.toString().replace('.', ',');
    }

    addItem(item: Product) {
        this.cartService.addToCart(item);
    }

}
