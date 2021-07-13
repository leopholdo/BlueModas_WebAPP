import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/api/Product/GetProducts', this.httpOptions)
    }

}