import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CatgoriesService } from '../../services/catgories.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'shivam-category-banner',
  templateUrl: './category-banner.component.html',
  styles: [
  ]
})
export class CategoryBannerComponent implements OnInit,OnDestroy {

  endSubs$: Subject<any> = new Subject();
  categories: any[] = [];


  constructor(private categoryService: CatgoriesService) { }

  ngOnInit(): void {
    this._initCategories();
  }

  private _initCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(category => {
      this.categories = category.data;
    })
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  

}
