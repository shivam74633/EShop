import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '@shivam/users';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit,OnDestroy {

  users = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private userService: UserService
    ,private messageService: MessageService
    ,private confirmationService: ConfirmationService
    ,private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }

 

  private _getCategories(){
    this.userService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe( user => {
      this.users = user.data;
    } )
  }

  updateUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`);
  }
  deleteUser(id: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(id).pipe(takeUntil(this.endSubs$)).subscribe(data => {
          if(!data.isError) {
            this.messageService.add({severity:'success', summary:'Success', detail:'User Deleted'});
            this._getCategories();
          }
          else{
            this.messageService.add({severity:'error', summary:'Error', detail:'User not deleted'});
          }
        }, () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'User not deleted'});
        })
      },
      reject: () => { return }
  })
    
  }

  ngOnDestroy(): void{
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
