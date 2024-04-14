import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { orderClass, userInfoModel } from '../../models/userModel';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatMenuModule,MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  userInfo: userInfoModel = new orderClass();

  constructor(private route: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.userInfo.subscribe(e => {
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo") as any)[0] as userInfoModel || {} as userInfoModel;      
    })
  }
  
  logOut() {    
    sessionStorage.clear();
    console.log(sessionStorage);
    this.route.navigate(['login']);
  }
}
