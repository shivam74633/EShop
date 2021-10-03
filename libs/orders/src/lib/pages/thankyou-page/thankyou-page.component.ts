import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/orders.service';

@Component({
  selector: 'shivam-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styles: [
  ]
})
export class ThankyouPageComponent implements OnInit {

  constructor(private orderService: OrderService,private cartService:  CartService,private route: ActivatedRoute,private router: Router) { }
  orderPlaced = false;

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['session_id']){
      const orderData = this.orderService.getCachedOrderData();
      this.orderService.createOrder(orderData).subscribe(() => {
        this.orderPlaced = true;
        this.cartService.emptyCart();
        this.orderService.removeCachedOrderData();
      })
    }
    else{
      this.router.navigate(['/']);
    }
  }
}
