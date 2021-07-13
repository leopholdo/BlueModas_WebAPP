import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../_models/client';
import { OrderEntity } from '../_models/orderEntity';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

    constructor(
        private http: HttpClient
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    completeCheckout(orderEntity: OrderEntity): Observable<OrderEntity> {
        return this.http.post<OrderEntity>('api/Checkout', orderEntity, this.httpOptions)
    }

    getClient(tclEmail: string): Observable<Client> {
        return this.http.get<Client>('/api/Client/GetClient?tclEmail=' + tclEmail, this.httpOptions)
    }

}
