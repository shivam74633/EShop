import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '@shivam/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit,OnDestroy {

  userCount = '';
  totalSales = '';
  orderCount = ''
  productCount = ''
  endSubs$: Subject<any> = new Subject();


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this._getAllValues();
  }

  private _getAllValues(){
    this.dashboardService.getOrdersCount().pipe(takeUntil(this.endSubs$)).subscribe(order => {
      console.log(order.data.orderCount);
      this.orderCount = order.data.orderCount;
    })
    this.dashboardService.getProductsCount().pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.productCount = product.data.count;
    })
    this.dashboardService.getTotalSales().pipe(takeUntil(this.endSubs$)).subscribe(sale => {
      this.totalSales = sale.data.totalSales;
    })
    this.dashboardService.getUserCount().pipe(takeUntil(this.endSubs$)).subscribe(user => {
      this.userCount = user.data.count;
    })
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
