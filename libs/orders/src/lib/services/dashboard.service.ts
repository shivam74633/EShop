import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  dashboardApiUrl = environment.apiURl;

  getProductsCount(): Observable<any>{
    return this.http.get(`${this.dashboardApiUrl}products/get/count`);
  }

  getUserCount(): Observable<any>{
    return this.http.get(`${this.dashboardApiUrl}user/get/count`);
  }

  getOrdersCount(): Observable<any>{
    return this.http.get(`${this.dashboardApiUrl}orders/get/count`);
  }

  getTotalSales(): Observable<any>{
    return this.http.get(`${this.dashboardApiUrl}orders/get/totalsales`);
  }

}
