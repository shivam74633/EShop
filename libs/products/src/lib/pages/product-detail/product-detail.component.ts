import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@shivam/orders';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'shivam-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit,OnDestroy {

  endSubs$: Subject<any> = new Subject();
  product: any;
  quantity = 1;
  constructor(private productService: ProductsService,private route: ActivatedRoute,private cartService: CartService,private messageService: MessageService) {
    this.quantity = 1;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productid){
        this._getProduct(params.productid);
      }
    })
  }

  private _getProduct(id: string){
    this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.product = product.data;
    })
  }

  addProducttoCart(){
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
    this.messageService.add({severity:'success', summary:'Success', detail:'Item added to cart'});
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
