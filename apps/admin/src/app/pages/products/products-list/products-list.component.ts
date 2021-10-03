import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@shivam/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit,OnDestroy {

  products = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private productService: ProductsService,private router: Router
    ,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.products = product.data;
    })
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe(data => {
          if(!data.isError) {
            this.messageService.add({severity:'success', summary:'Success', detail:'Product Deleted'});
            this._getProducts();
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:'Product not deleted'});
          }
        }, () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Product not deleted'});
        })
      },
      reject: () => { return }
  })
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts(){
    this.productService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe( products => {
      this.products = products.data;
    } )
  }


  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }




}
