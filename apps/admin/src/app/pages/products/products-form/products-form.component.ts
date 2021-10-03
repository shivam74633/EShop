import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatgoriesService, ProductsService } from '@shivam/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit,OnDestroy {

  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay : string | ArrayBuffer | null;
  currentProductId = '';
  endSubs$: Subject<any> = new Subject();
  

  constructor(private formBuilder: FormBuilder,private categoryService: CatgoriesService,private location: Location,private productService: ProductsService,private messageService: MessageService,private route: ActivatedRoute) { 
    this.imageDisplay = '';
    this.form = this.formBuilder.group({
    })
  }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      brand: ['',Validators.required],
      price: ['',Validators.required],
      category: ['',Validators.required],
      countInStock: ['',Validators.required],
      description: ['',Validators.required],
      richDescription: [''],
      image: ['',Validators.required],
      isFeatured: [false]
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories.data
    }
    )
  }

  get productForm (){
    return this.form.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return
    }
    const productFormData = new FormData();
    Object.keys(this.productForm).map(key => {
      if(key == 'category'){
        productFormData.append(key,this.productForm[key].value.id)
      }
      else{
        productFormData.append(key,this.productForm[key].value)
      }
    })
    if(this.editMode){
      this._updateProduct(productFormData);
    }
    else{
      this._addProduct(productFormData);
    }
  }

  onCancel(){
    this.location.back();
  }

  onImageUpload(event: any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file});
      // this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader;
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

  private _checkEditMode(){
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(params.id).pipe(takeUntil(this.endSubs$)).subscribe(product => {
          this.form.controls.name.setValue(product.data.name);
          this.form.controls.brand.setValue(product.data.brand);
          this.form.controls.price.setValue(product.data.price);
          this.form.controls.category.setValue(product.data.category);
          this.form.controls.countInStock.setValue(product.data.countInStock);
          this.form.controls.description.setValue(product.data.description);
          this.form.controls.richDescription.setValue(product.data.richDescription);
          this.form.controls.isFeatured.setValue(product.data.isFeatured);
          this.imageDisplay = product.data.image;
          this.productForm.image.setValidators([]);
          this.form.controls.image.updateValueAndValidity();
        }
          )
      }
    })
  }

  private _addProduct(productData: FormData){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.productService.createProduct(productData).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Product is Created'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Product is not created'}); 
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not created'});
    }
      
      )
  }

  private _updateProduct(productData: FormData){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.productService.updateProuct(this.currentProductId,productData).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Product is Updated'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Product is not updated'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not updated'});
    }
      
      )
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
