import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'shivam-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount = '0';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      if(cart.items){
        const cartItem = cart.items
        this.cartCount = String(cartItem.length);
      }
    })
  }

}
