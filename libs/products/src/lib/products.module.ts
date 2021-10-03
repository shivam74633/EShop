import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { CatgoriesService } from "./services/catgories.service";
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component'
import {ButtonModule} from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from "@angular/forms";
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import {UiModule} from '@shivam/ui';
import { MessageService } from "primeng/api";



const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductListComponent
  },
  {
    path: 'product/:productid',
    component: ProductDetailComponent
  }
]
@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes),ButtonModule,CheckboxModule,FormsModule,RatingModule,InputNumberModule,UiModule,ToastModule],
  declarations: [
    ProductSearchComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductDetailComponent
  ],
  providers: [CatgoriesService,MessageService],
  exports: [ProductSearchComponent, CategoryBannerComponent, ProductItemComponent, FeaturedProductComponent, ProductListComponent, ProductDetailComponent]
})
export class ProductsModule {}
