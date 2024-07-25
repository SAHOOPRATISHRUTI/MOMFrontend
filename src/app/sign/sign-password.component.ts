import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

import { ServiceService } from '../service/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-password',
  templateUrl: './sign-password.component.html',
  styleUrls: ['./sign-password.component.css']
})
export class SignPasswordComponent  {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private loginService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin() {
    this.loginService.login1(this.email, this.password).subscribe(
      response => {
        this.message = response.message;
        this.toastr.success(this.message); // Show success message with Toastr
        console.log("Login Successfully");
        this.router.navigate(['/reset-password/MeetingList']); 
      },
      error => {
        if (error.status === 401) {
          this.message = 'Invalid user';
        } else if (error.status === 500) {
          this.message = 'Internal server error. Please try again later.';
          console.error('Internal Server Error:', error.error); // Log detailed error response
        } else {
          this.message = 'An error occurred. Please try again later.';
          console.error('Unexpected Error:', error);
        }
        this.toastr.error(this.message); // Show error message with Toastr
      }
    );
  }
  
}