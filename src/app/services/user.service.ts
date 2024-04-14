import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {userModel} from '../models/userModel'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: EventEmitter<any> = new EventEmitter();

  url: string = 'https://randomuser.me/api/?results=1';
  credentialsAdmin: userModel[] = [
    {user: "admin", password: "admin", admin: true},
  ];

  credentialsUser: userModel[] = [
    {user: "user", password: "user", admin: false},
  ];

  constructor(private http: HttpClient) { }

  login(user: userModel) {
    return new Observable<any>(observer => {
      try {   
        if(user.admin) {
          if(this.credentialsAdmin.find(e => e.user == user.user && e.password == user.password)){
            observer.next({apiKey: "2jalksdjoqa3lkajsdlkj3ojoi3u4o241mb.,cvmnvmnvlb", admin: user.admin});
          } else {
            observer.error("usuario y contraseña no coinciden");
          }
        } else {
          if(this.credentialsUser.find(e => e.user == user.user && e.password == user.password)){
            observer.next({apiKey: "2jalksdjoqa3lkajsdlkj3ojoi3u4o241mb.,cvmnvmnvlb", admin: user.admin});
          } else {
            observer.error("usuario y contraseña no coinciden");
          }
        }        
      } catch {
        observer.error("Sucedio algo inesperado")
      }      
    });    
  }

  checkLogin(): boolean {
    let apikey: string = sessionStorage?.getItem("apikey") || "";    
    return apikey.length > 0
  }

  getUser() {
    return this.http.get<any>(this.url);
  }
}
