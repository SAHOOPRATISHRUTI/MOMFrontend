import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-ntspl-admin',
  templateUrl: './ntspl-admin.component.html',
  styleUrls: ['./ntspl-admin.component.css']
})
export class NtsplAdminComponent {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: ServiceService
  )
   {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email=this.loginForm.get('email')?.value;
      sessionStorage.setItem('email', email);
      this.service.generateOtp(this.loginForm.value.email)
        .subscribe({
          next: (response: any) => {
            this.toastr.success('OTP generated successfully', response.otp); 
            console.log('OTP generation response:', response);
            this.router.navigate(['/otp']);
          },
          error: (error) => {
            this.toastr.error('Error generating OTP', error.error.message);
            console.error('Error generating OTP:', error);
          }
        });
    } else {
      this.toastr.error('Please enter a valid email');
    }
  }
}
