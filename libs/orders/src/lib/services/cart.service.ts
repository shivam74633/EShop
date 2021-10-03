import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ :BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() {}

  initCartLocalStorage(){
    const cart: Cart = this.getCart();
    if(!cart || !cart.items){
      const initialCart = {
        items: []
      }
      const initialCartJSON = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY,initialCartJSON);
    }  
  }

  getCart(): Cart{
    const cartJSON: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    return cartJSON;
  }

  setCartItem(cartItem: CartItem,updateCartItem?:boolean): Cart{
    const cart: Cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
    if(cartItemExist){
      cart.items?.map(item => {
        if(item.productId === cartItem.productId){
          if(item.quantity && cartItem.quantity){
            if(updateCartItem){
              item.quantity = cartItem.quantity;
            }else{
              item.quantity = item.quantity + cartItem.quantity;
            }
          }
        }
      })
    }
    else{
      cart.items?.push(cartItem);
    }
    const initialCartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY,initialCartJSON);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string){
    const cart: Cart = this.getCart();
    const newCartItems = cart.items?.filter(item => item.productId !== productId);
    cart.items = newCartItems;

    const initialCartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY,initialCartJSON);
    
    this.cart$.next(cart);
  }

  emptyCart(){
    const initialCart = {
      items: []
    }
    const initialCartJSON = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY,initialCartJSON);
    this.cart$.next(initialCart);
  }

}
