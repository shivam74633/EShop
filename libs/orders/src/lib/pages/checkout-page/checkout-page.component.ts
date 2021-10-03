import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@shivam/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Order, OrderItem } from '../../models/orders';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrderService } from '../../services/orders.service';



declare const require: any;

@Component({
  selector: 'shivam-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit,OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  orderItems: OrderItem[] = [];
  currentUserId = '';
  countries: any[] = [];
  endSubs$: Subject<any> = new Subject();
  userId = '';



  constructor(
    private formBuilder: FormBuilder
    ,private userService: UserService
    ,private messageService: MessageService,
    private location: Location
    ,private route: ActivatedRoute,private router: Router,private cartService: CartService,private orderService: OrderService) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      street: ['',Validators.required],
      apartment: ['',Validators.required],
      zip: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required]
    })
   }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      street: ['',Validators.required],
      apartment: ['',Validators.required],
      zip: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required]
    })
    // this._checkEditMode();
    this._getCountries();
    this._getCartItems();
    this._autoFillUserData();
  }

  private _getCartItems(){
    const cart: Cart = this.cartService.getCart();
    if(cart.items){
      this.orderItems = cart.items.map(item => {
        return {
          product: item.productId,
          quantity: item.quantity
        }
      })
    }
  }

  private _autoFillUserData(){
    this.userService.
    observeCurrentUser()
    .pipe(takeUntil(this.endSubs$))
    .subscribe(user => {
      if(user){
        this.userId = user.id;
        this.form.controls.name.setValue(user.name);
        this.form.controls.email.setValue(user.email);
        this.form.controls.phone.setValue(user.phone);
        this.form.controls.street.setValue(user.street);
        this.form.controls.apartment.setValue(user.apartment);
        this.form.controls.zip.setValue(user.zip);
        this.form.controls.city.setValue(user.city);
        this.form.controls.country.setValue(user.country);
      }
    })
  }



  get checkOutForm (){
    return this.form.controls;
  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(country => {
      return {
        id: country[0],
        name: country[1]
      }
    })
  }
  backToCart(){
    this.router.navigate(['/cart']);
  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.checkOutForm.invalid){
      return
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkOutForm.street.value,
      shippingAddress2: this.checkOutForm.apartment.value,
      city: this.checkOutForm.city.value,
      zip: this.checkOutForm.zip.value,
      country: this.checkOutForm.country.value,
      phone: this.checkOutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    }
    this.orderService.cacheOrderData(order);
    this.orderService.createCheckoutSession(this.orderItems).subscribe(error => {
      if(error){
        console.log('error in redirect to payment')
      }
    })

  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
