import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlFirebaseProdotti: string = "https://phone-store-6310f-default-rtdb.europe-west1.firebasedatabase.app/phones";

  constructor(
    private http: HttpClient,
    private authService: AuthService)
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
    const token = this.authService.user?.token;
    return this.http.post(
      `${this.urlFirebaseProdotti}.json?auth=${token}`,
      body
    );
  }
  
  deleteProdotto(id: string) {
    const token = this.authService.user?.token;
    return this.http.delete(
      `${this.urlFirebaseProdotti}/${id}.json?auth=${token}`
    );
  }
  
  updateProdotto(id: string, body: {}) {
    const token = this.authService.user?.token;
    return this.http.patch(
      `${this.urlFirebaseProdotti}/${id}.json?auth=${token}`,
      body
    );
  }

  getProductsArray() {
    return this.getProdotti().pipe(
      map((data: any) => {
        const prodotti: Product[] = [];
        Object.keys(data).forEach((key) => {
          data[key]['id'] = key;
          prodotti.push(data[key]);
        });
        return prodotti;
      })
    );
  }
  
}
