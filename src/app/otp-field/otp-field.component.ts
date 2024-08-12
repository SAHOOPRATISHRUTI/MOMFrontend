import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otp-field',
  templateUrl: './otp-field.component.html',
  styleUrls: ['./otp-field.component.css']
})
export class OtpFieldComponent {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  otp5: string = '';
  otp6: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  verifyOTP() {
    const enteredOTP = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    const email = sessionStorage.getItem('email');

    if (!email) {
      alert('Email not found in session. Please try again.');
      return;
    }

    const otpPayload = { email, otp: enteredOTP };

    const verifyOtpUrl = 'http://localhost:5050/api/employee/login-otp';

    this.http.post<any>(verifyOtpUrl, otpPayload).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['/user-dashboard']);
        } else {
          alert('OTP verification failed. Please try again.');
        }
        
      },
      (error) => {
        console.error('Error verifying OTP', error);
        alert('Error verifying OTP. Please try again later.');
      }
    );
  }

  moveFocus(event: any, nextInput: string): void {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.maxLength.toString(), 10);

    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      const element = document.getElementsByName(nextInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
      }
    }
  }

  moveBack(event: KeyboardEvent, prevInput: string, currentInput?: string): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0) {
      const element = document.getElementsByName(prevInput)[0] as HTMLInputElement;
      if (element) {
        element.focus();
        if (currentInput) {
          currentInput = ''; // Clear the current input value
        }
      }
    }
  }
}
