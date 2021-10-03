import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shivam/users';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private localStorageService: LocalStorageService,private router: Router) { }

  logout(){
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }

}
