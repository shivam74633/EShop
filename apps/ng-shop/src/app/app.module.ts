import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductsModule } from '@shivam/products';
import { UiModule } from '@shivam/ui';
import { OrdersModule } from '@shivam/orders';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component' 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JwtInterceptor } from '@shivam/users';
import { MessageService } from 'primeng/api';
import { NgxStripeModule } from 'ngx-stripe';



const routes: Routes = [
  { path: '', component: HomePageComponent },
]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [BrowserModule,BrowserAnimationsModule,ProductsModule, RouterModule.forRoot(routes),AccordionModule,UiModule,HttpClientModule,OrdersModule,StoreModule.forRoot({}),EffectsModule.forRoot([]),NgxStripeModule.forRoot('pk_test_51Jg8itSGQBQmqhIV5edypPbto8JOnqPhZ2oKZBSBOX75oZ4hLjb4HXDCEoWDPhaXYmYxMdukSA07zhKBlRiUuf6a00lFdcyZzH')],
  providers: [MessageService,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
