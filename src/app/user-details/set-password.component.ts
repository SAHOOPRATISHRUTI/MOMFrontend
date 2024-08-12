import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = true;
  roles = ['USER', 'ADMIN']; // Add roles here

  constructor(
    private _formBuilder: FormBuilder,
    private httpService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(3)]],
      secondCtrl: ['', [Validators.required, Validators.email]],
      roleCtrl: ['', Validators.required] // Add role control here
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      this.toastr.error('Please fill all required fields correctly.', 'Validation Error');
      return;
    }
  
    const userData = {
      name: this.firstFormGroup.value.firstCtrl,
      email: this.firstFormGroup.value.secondCtrl,
      password: this.secondFormGroup.value.thirdCtrl,
      role: this.firstFormGroup.value.roleCtrl // Include role in user data
    };
  
    this.httpService.createEmployee(userData).subscribe(
      response => {
        console.log('Success:', response);
        this.toastr.success(response.message, 'Success');
        this.router.navigate(['/reset-password']);
      },
      error => {
        console.error('Error:', error);
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error');
        }
      }
    );
  }
}
