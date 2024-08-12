import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string = '';
  nwpassword: string = '';
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';

  showPassword:boolean=false;

  constructor(private authService: ServiceService, private toastr: ToastrService, private router: Router) {}

  getOtp(): string {
    return `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`;
  }

  onSubmit(): void {
    const email = sessionStorage.getItem('email');
    if (!email) {
      this.toastr.error('Email not found in local storage', 'Error');
      return;
    }

    if (this.password !== this.nwpassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    const otp = this.getOtp();
    if (otp.length !== 4) {
      this.toastr.error('Please enter a 4-digit OTP', 'Error');
      return;
    }

    this.authService.resetPassword(email, this.password, otp, this.nwpassword)
      .subscribe({
        next: response => {
          console.log(response);
          this.toastr.success('Password updated successfully');
          this.router.navigate(['/ntspl']);
        },
        error: error => {
          console.error('Error updating password:', error);
          this.toastr.error('Error updating password. Please try again.', 'Error');
        }
      });
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);

    if (input.value.length >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }

 // reset-password.component.ts
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

}
