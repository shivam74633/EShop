import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CatgoriesService } from '@shivam/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit,OnDestroy {

  endSubs$: Subject<any> = new Subject();


  categories: Category[] = [];
  constructor(
    private categoryService: CatgoriesService
    ,private messageService: MessageService
    ,private confirmationService: ConfirmationService
    ,private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(data => {
          if(!data.isError) {
            this.messageService.add({severity:'success', summary:'Success', detail:'Category Deleted'});
            this._getCategories();
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:'Category not deleted'});
          }
        }, () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Category not deleted'});
        }).unsubscribe();
      },
      reject: () => { return }
  })
    
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe( cats => {
      this.categories = cats.data;
    } )
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
