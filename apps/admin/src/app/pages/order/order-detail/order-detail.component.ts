import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  OrderService } from '@shivam/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';
import {Subject, timer} from'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit,OnDestroy {
  orderStauses: any[] = [];
  orderDetail : any;
  currentOrderId = '';
  orderStatus: any = ORDER_STATUS;
  selectedStatus: any;
  endSubs$: Subject<any> = new Subject();

  constructor(private orderService: OrderService,private route: ActivatedRoute,private messageService: MessageService,private location: Location) { 
    this.orderDetail = {};
  }
 

  ngOnInit(): void {
    this._getOrderDetails();
    this._mapOrderStatus();
  }

  private _mapOrderStatus(){
    this.orderStauses =  Object.keys(ORDER_STATUS).map(key => {
      return {
        id: key,
        name: this.orderStatus[key].label
      }
    })
  }

  private _getOrderDetails(){
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe(params => {
      if(params.id){
        this.currentOrderId = params.id;
        this.orderService.getOrder(params.id).pipe(takeUntil(this.endSubs$)).subscribe(order => {
          this.orderDetail = order.data;
        })
      }
    })
  }

  onStatusChange(event: any){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.orderService.updateOrderStatus(this.currentOrderId,{status: event.value}).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Order Status is Updated'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Order Status is not updated'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not created'});
    }
    
    )
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }


}
