import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  employees: any[] = [];
  addEmployeeForm: FormGroup;
  itemsPerPage: number = 2;
  p: number = 1;
  totalItems: number = 4;
  adminName: string = '';
  searchKey: string = '';
  constructor(
    private serviceService: ServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required],
      password: ['', Validators.required]
    });

    // Access the adminName passed via the router
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.adminName = navigation.extras.state['adminName'];
    }
  }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const order = -1;
    this.serviceService.listEmployees(order, this.itemsPerPage, this.p, this.searchKey).subscribe(
      response => {
        console.log('API Response:', response); 
        this.employees = response.data.employeeData;
        this.totalItems = response.data.totalCount;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  
  
  
  onSearch() {
    this.p = 1;  
    this.fetchEmployees();
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      this.serviceService.createEmployee(this.addEmployeeForm.value).subscribe(
        response => {
          this.fetchEmployees();
          this.addEmployeeForm.reset();
        },
        error => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  get showingRange(): string {
    const start = (this.p - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.p * this.itemsPerPage, this.totalItems);
    return `Showing ${start} to ${end} of ${this.totalItems} entries`;
  }
}
