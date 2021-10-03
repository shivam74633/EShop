import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, CatgoriesService } from '@shivam/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit,OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId = '';
  endSubs$: Subject<any> = new Subject();


  constructor(
    private formBuilder: FormBuilder
    ,private categoryService: CatgoriesService
    ,private messageService: MessageService,
    private location: Location
    ,private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: [''],
      icon: [''],
      color: ['']

    })
   }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      icon: ['',Validators.required],
      color: ['#fff']

    })
    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const category: Category = {
      name: this.form.controls.name.value,
      icon: this.form.controls.icon.value,
      color: this.form.controls.color.value
    }
    if(this.editMode){
      this._updateCategory(category);
    }
    else{
      this._addCategory(category);
    }
    
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoryService.getCategory(params.id).pipe(takeUntil(this.endSubs$)).subscribe(category => {
          this.form.controls.name.setValue(category.data.name);
          this.form.controls.icon.setValue(category.data.icon);
          this.form.controls.color.setValue(category.data.color);
        }
          )
      }
    })
  }


  private _addCategory(category: Category){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.categoryService.createCategory(category).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category is Created'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
    }
      
      )
  }

  private _updateCategory(category: Category){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.categoryService.updateCategory(this.currentCategoryId,category).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category is Updated'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Category is not updated'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not updated'});
    }
      
      )
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  onCancel(){
    this.location.back();
  }

}
