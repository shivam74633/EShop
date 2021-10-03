import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CatgoriesService } from '../../services/catgories.service';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'shivam-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit,OnDestroy {

  products = [];
  endSubs$: Subject<any> = new Subject();
  categories: any[] = [];
  isCategorypage = false;
  constructor(private productService: ProductsService
    ,private categoryService:CatgoriesService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]): this._getProducts();
      params.categoryid ? this.isCategorypage = true : this.isCategorypage = false
    })
    this._getCategories();
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(category => {
      this.categories = category.data;
    })
  }


  private _getProducts(categoryFilter?: string[]){
    this.productService.getProducts(categoryFilter).pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.products = product.data;
    })
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.subscribe();
  }

  categoryFilter(){
    const selectedCategories = this.categories.filter(category => category.checked).map(category => category.id);
    // console.log(selectedCategories);
    this._getProducts(selectedCategories);
  }

}
