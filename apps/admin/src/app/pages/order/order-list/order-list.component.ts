import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService,Order } from '@shivam/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})
export class OrderListComponent implements OnInit,OnDestroy {

  orderStatus: any = ORDER_STATUS;

  orders: Order[] = [];

  endSubs$: Subject<any> = new Subject();

  constructor(private orderService: OrderService,private router: Router
    ,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();
  }

  deleteOrder(orderId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe(data => {
          if(!data.isError) {
            this.messageService.add({severity:'success', summary:'Success', detail:'Order Deleted'});
            this._getOrders();
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:'Order not deleted'});
          }
        }, () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Order not deleted'});
        })
      },
      reject: () => { return }
  })
  }

  viewDetail(orderId: string){
    this.router.navigateByUrl(`orders/detail/${orderId}`);
  }

  private _getOrders(){
    this.orderService.getOrders().pipe(takeUntil(this.endSubs$)).subscribe( order => {
      this.orders = order.data;
    } )
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
