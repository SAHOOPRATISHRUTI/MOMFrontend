import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent  implements OnInit {
  employee: any;

  ngOnInit() {
    console.log('response',localStorage)
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
      this.employee = JSON.parse(employeeData);
    } else {
      // Handle case where employee data is not available
      console.error('No employee data found in localStorage');
    }
  }
}