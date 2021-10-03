import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';


@Component({
  selector: 'shivam-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit,OnDestroy {

  cartCount = '0';
  endSubs$: Subject<any> = new Subject();

  cartItemsDetails: CartItemDetailed[] = [];

  totalPrice = 0;


  constructor(private router: Router,private cartService: CartService,private orderService: OrderService,private messageService :MessageService) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart => {
      respCart.items?.forEach(cartItem => {
        if(cartItem.quantity){
        this.cartItemsDetails = [];
        this.cartCount = String(respCart?.items?.length) ?? '0';
        this.orderService.getProduct(cartItem.productId??'').subscribe(product => 
          this.cartItemsDetails.push({
            product: product.data,
            quantity: cartItem.quantity,
          })
        )
        }
    })}
  )}

  backToShop(){
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id);
    this.messageService.add({severity:'success', summary:'Success', detail:'Item removed from cart'});
  }

  updateCartItemQuantity(event: any,cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    },true)
    this.messageService.add({severity:'success', summary:'Success', detail:'Cart updated'});

  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
