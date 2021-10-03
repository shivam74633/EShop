import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'shivam-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit,OnDestroy {

  featuredProduct: any[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts(){
    this.productsService.getFeaturedproducts(5).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredProduct = products.data;
    })
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
