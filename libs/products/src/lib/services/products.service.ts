import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from '@env/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  productApiUrl = environment.apiURl+ 'products';

  constructor(private http: HttpClient) { }

  getProducts(categoriesFilter?: string[]) : Observable<any>{
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories',categoriesFilter.join(','));
    }
    return this.http.get(this.productApiUrl,{params: params});
  }

  getProduct(id: string) : Observable<any>{
    return this.http.get(`${this.productApiUrl}/${id}`);
  }

  createProduct(productData: FormData) : Observable<any>{
    return this.http.post(this.productApiUrl,productData)
  }

  deleteProduct(productId: string): Observable<any>{
    return this.http.delete(`${this.productApiUrl}/${productId}`)
  }

  updateProuct(productId: string,productData: FormData) : Observable<any>{
    return this.http.put(`${this.productApiUrl}/${productId}`,productData);
  }

  getFeaturedproducts(count: number): Observable<any>{
    return this.http.get(`${this.productApiUrl}/get/featured/${count}`)
  }
}
