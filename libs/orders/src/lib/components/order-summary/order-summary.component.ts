import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { take } from 'rxjs/internal/operators/take';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shivam-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit,OnDestroy {

  isCheckout = false;

  constructor(private cartService: CartService,private orderService: OrderService,private router: Router) {
    this.isCheckout = this.router.url.includes('checkout') ? true: false;
   }

  endSubs$: Subject<any>  = new Subject();

  totalPrice = 0;

  ngOnInit(): void {
    this._getOrderSummary();
  }

  private _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0;
      if(cart.items){
        cart.items.map((item) => {
          this.orderService.getProduct(item.productId??'')
          .pipe(take(1)).subscribe((product: any) => {
            if(item.quantity){
              this.totalPrice += product.data.price * item.quantity;
            }
          })
        })
      }
    })
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout']);
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
