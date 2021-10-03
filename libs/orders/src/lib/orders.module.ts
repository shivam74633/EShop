import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartService } from "./services/cart.service";
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from "@angular/router";
import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import {InputNumberModule} from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';
import { AuthGuard, UsersModule } from "@shivam/users";
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    canActivate:[AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankyouPageComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  }
]

@NgModule({
  imports: [CommonModule,BadgeModule,ButtonModule,InputNumberModule,RouterModule.forChild(routes),ToastModule,FormsModule,ReactiveFormsModule,DropdownModule,InputTextModule,InputSwitchModule,UsersModule],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankyouPageComponent,
    ErrorPageComponent
  ],
  exports: [CartIconComponent]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
