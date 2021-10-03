import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'shivam-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private messageService: MessageService,private localStorageService: LocalStorageService,private router: Router) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }
    this.isSubmitted = true;
    const user = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }
    this.userService.login(user).subscribe(data => {
      if(!data.isError) {
        this.localStorageService.setIToken(data.token);
        this.messageService.add({severity:'success', summary:'Success', detail:'Login Success'});
        this.router.navigate(['/']);
      }
      else{
        this.messageService.add({severity:'error', summary:'Error', detail: `Login Failed ${data.error.detail}`});
      }
    }, (err) => {
      this.messageService.add({severity:'error', summary:'Error', detail: `Login Failed ${err.error.detail}`});
    })
  }

}
