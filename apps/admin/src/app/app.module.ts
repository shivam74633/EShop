import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {  JwtInterceptor, UsersModule } from "@shivam/users";

import { AppComponent } from "./app.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CatgoriesService } from '@shivam/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order/order-detail/order-detail.component';


import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService,ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {FieldsetModule} from 'primeng/fieldset';
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgxStripeModule } from "ngx-stripe";








const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  FieldsetModule
]


@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UsersFormComponent, OrderListComponent, OrderDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...UX_MODULE,
    UsersModule,
    StoreModule.forRoot({}),EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51Jg8itSGQBQmqhIV5edypPbto8JOnqPhZ2oKZBSBOX75oZ4hLjb4HXDCEoWDPhaXYmYxMdukSA07zhKBlRiUuf6a00lFdcyZzH')
  ],
  providers: [CatgoriesService,MessageService,ConfirmationService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
