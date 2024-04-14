import { Component, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserService } from '../../services/user.service';
import { userModel } from '../../models/userModel';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, MatCardModule, MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true; 

  constructor(private loginService: UserService, private router: Router, private formBuilder: FormBuilder, private modalService: ModalService) {}

  formLogin = this.formBuilder.group({
    user: ["", Validators.required],
    password: ["", Validators.required],
    admin: [false]
  })

  onSubmit() {  
    if(!this.formLogin.valid) return;
    this.loginService.login(this.formLogin.value as userModel).subscribe((e: any) => {
      this.getDataUser();
      sessionStorage.setItem("apikey", e.apiKey);
      sessionStorage.setItem("admin", e.admin);      
      this.formLogin.value.admin ? this.router.navigate(['/admin/home']) : this.router.navigate(['/user/home']);
    }, e => {
      this.modalService.open('Error', e, 'error', 'text-error');
    })
  }

  private getDataUser() {
    this.loginService.getUser().subscribe(response => {
      sessionStorage.setItem("userInfo", JSON.stringify(response.results));
      this.loginService.userInfo.emit();
      return response.results;
    }, error => {
      console.error('Error al obtener usuario:', error);
    });
  }

  openModal() {
    this.modalService.open('Error', 'Ocurrio un error, por favor revisar los campos', 'error', 'text-error');
  }

  closeModal() {
    this.modalService.close();
  }

}
