import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlFirebaseProdotti: string = "https://phone-store-6310f-default-rtdb.europe-west1.firebasedatabase.app/phones"

  constructor(
    private http: HttpClient) 
    {}


  getProdotti() {
    return this.http.get(
      `${this.urlFirebaseProdotti}.json`
    );
  }

  getProductById(id: string | null) {
    return this.getProdotti().pipe(
      map((data: any) => {
        const products = Object.keys(data).map(key => {
          data[key]['id'] = key;
          return data[key];
        });
        return products.find(p => p.id === id);
      })
    );
  }

  insertProdotto(body: {}) {
    return this.http.post(
      `${this.urlFirebaseProdotti}.json`,
      body
    );
  }
  
  deleteProdotto(id: string) {
    return this.http.delete(
      `${this.urlFirebaseProdotti}/${id}.json`
    );
  }
  
  updateProdotto(id: string, body: {}) {
    return this.http.patch(
      `${this.urlFirebaseProdotti}/${id}.json`,
      body
    );
  }
}
