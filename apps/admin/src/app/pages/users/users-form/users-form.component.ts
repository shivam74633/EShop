import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@shivam/users';
import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

declare const require: any;

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit,OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId = '';
  countries: any[] = [];
  endSubs$: Subject<any> = new Subject();



  constructor(
    private formBuilder: FormBuilder
    ,private userService: UserService
    ,private messageService: MessageService,
    private location: Location
    ,private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      password: [''],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    })
   }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    })
    this._checkEditMode();
    this._getCountries();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const user: any = {
      name: this.form.controls.name.value,
      password: this.form.controls.password.value,
      email: this.form.controls.email.value,
      phone: this.form.controls.phone.value,
      isAdmin: this.form.controls.isAdmin.value,
      street: this.form.controls.street.value,
      apartment: this.form.controls.apartment.value,
      zip: this.form.controls.zip.value,
      city: this.form.controls.city.value,
      country: this.form.controls.country.value.name
    }
    if(this.editMode){
      this._updateUser(user);
    }
    else{
      this._addUser(user);
    }
    
  }

  private _checkEditMode(){
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentUserId = params.id;
        this.userService.getUser(params.id).pipe(takeUntil(this.endSubs$)).subscribe(user => {
          this.form.controls.name.setValue(user.data.name);
          this.form.controls.email.setValue(user.data.email);
          this.form.controls.phone.setValue(user.data.phone);
          this.form.controls.isAdmin.setValue(user.data.isAdmin);
          this.form.controls.street.setValue(user.data.street);
          this.form.controls.apartment.setValue(user.data.apartment);
          this.form.controls.zip.setValue(user.data.zip);
          this.form.controls.city.setValue(user.data.city);
          this.form.controls.country.setValue(user.data.country);
          this.form.controls.password.setValidators([]);
          this.form.controls.password.updateValueAndValidity();
        }
          )
      }
    })
  }


  private _addUser(user: any){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.userService.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'User is Created'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'User is not created'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'User is not created'});
    }
      
      )
  }

  private _updateUser(user: any){
    timer(2000).toPromise().then(() => {
      this.location.back();
    })
    this.userService.updateUser(this.currentUserId,user).pipe(takeUntil(this.endSubs$)).subscribe(data => {
      if(!data.isError) {
        this.messageService.add({severity:'success', summary:'Success', detail:'User is Updated'});
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail:'User is not updated'});
      }
    }, () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'User is not updated'});
    }
      
      )
  }

  onCancel(){
    this.location.back();
  }

  get userForm (){
    return this.form.controls;
  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(country => {
      return {
        id: country[0],
        name: country[1]
      }
    })
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
