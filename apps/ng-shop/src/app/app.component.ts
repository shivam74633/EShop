import { Component, OnInit } from '@angular/core';
import { UserService } from '@shivam/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'ng-shop';
  constructor(private userService: UserService) {}

  ngOnInit(){
    this.userService.initAppSession();
  }
}
