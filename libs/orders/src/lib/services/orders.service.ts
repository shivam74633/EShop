import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Order, OrderItem } from '../models/orders';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersApiUrl = environment.apiURl+ 'orders';
  productsApiUrl = environment.apiURl+ 'products';

  constructor(private http: HttpClient,private stripeService: StripeService) { }

  getOrders() : Observable<any>{
    return this.http.get(this.ordersApiUrl);
  }

  getOrder(id: string) : Observable<any>{
    return this.http.get(`${this.ordersApiUrl}/${id}`);
  }

  createOrder(order: Order) : Observable<any>{
    return this.http.post(this.ordersApiUrl,order);
  }

  deleteOrder(orderId: string): Observable<any>{
    return this.http.delete(`${this.ordersApiUrl}/${orderId}`)
  }

  updateOrderStatus(orderId: string,status: any) : Observable<any>{
    return this.http.put(`${this.ordersApiUrl}/${orderId}`,status);
  }
  getProduct(id: string) : Observable<any>{
    return this.http.get(`${this.productsApiUrl}/${id}`);
  }

  createCheckoutSession(orderItem: OrderItem[]){
    return this.http.post(`${this.ordersApiUrl}/create-checkout-session`,{orderItems: orderItem}).pipe(switchMap((session: any) => {
      console.log('session.data.sessionId');
      return this.stripeService.redirectToCheckout({sessionId: session.data.sessionId})
    }));
  }

  cacheOrderData(order: Order){
    localStorage.setItem('orderData',JSON.stringify(order));
  }

  getCachedOrderData(): Order{
    return JSON.parse(localStorage.getItem('orderData') || '{}')
  }

  removeCachedOrderData(){
    localStorage.removeItem('orderData');
  }
}
