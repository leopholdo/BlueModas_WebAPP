import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../_models/client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {

    constructor(
        private http: HttpClient
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        })
    };

    getClient(tclEmail: string): Observable<Client> {
        return this.http.get<Client>('/api/Client/GetClient?tclEmail=' + tclEmail, this.httpOptions);
    }

}