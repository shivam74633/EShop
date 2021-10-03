import { Component,Input } from '@angular/core';
import { CartService,CartItem } from '@shivam/orders';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'shivam-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent{
  @Input() product: any;

  constructor(private cartService: CartService,private messageService: MessageService) { }
  
  addProductToCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
    this.messageService.add({severity:'success', summary:'Success', detail:'Item added to cart'});
  }


}
