import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-password',
  templateUrl: './sign-password.component.html',
  styleUrls: ['./sign-password.component.css']
})
export class SignPasswordComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  message: string = '';

  constructor(
    private loginService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
  const { email, password } = this.loginForm.value;
  if (typeof email === 'string' && typeof password === 'string') {
    this.loginService.loginWithPassword(email, password).subscribe(
      response => {
        console.log('Login Response:', response);
        this.message = response.message;
        this.toastr.success(this.message);

        if (response && response.data.employee) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('employee', JSON.stringify(response.data.employee));

          const userRole = response.data.employee.role;
          if (userRole === 'USER') {
            this.router.navigate(['/user-dashboard']);
          } else if (userRole === 'ADMIN') {
            const adminName = response.data.employee.name;
            this.router.navigate(['/admin-dashboard'], { state: { adminName } });
          } else {
            this.toastr.error('Unknown user role');
          }
        } else {
          this.toastr.error('Invalid response structure');
        }
      },
      error => {
        // Handle errors
      }
    );
  } else {
    this.toastr.error('Please enter valid email and password');
  }
}

  
  
  }

