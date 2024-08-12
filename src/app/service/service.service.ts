import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:5050/api'; 

  constructor(private http: HttpClient) {}

  // Endpoint for login with password
 
  loginWithPassword(email: string, password: string): Observable<any> {
    const urlStr = `${this.apiUrl}/employee/login-password`;
    return this.http.post<any>(urlStr, { email, password }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  // Endpoint for user signup
  addUser(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/auth/signup`;
    return this.http.post(urlStr, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Endpoint to request OTP
  requestOtp(email: string): Observable<any> {
    const urlStr = `${this.apiUrl}/employee/request-otp`;
    return this.http.post(urlStr, { email }).pipe(
      catchError(this.handleError)
    );
  }

  // Endpoint to verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    const urlStr = `${this.apiUrl}/employee/login-otp`;
    return this.http.post(urlStr, { email, otp }).pipe(
      catchError(this.handleError)
    );
  }

  // Endpoint to reset password
  resetPassword(email: string, password: string, otp: string, confirmPassword: string): Observable<any> {
    const urlStr = `${this.apiUrl}/auth/reset-password`;
    const body = { email, password, otp, confirmPassword };
    return this.http.post(urlStr, body).pipe(
      catchError(this.handleError)
    );
  }

  // Endpoint to create an employee
  createEmployee(employeeData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/auth/createEmployee`;
    return this.http.post(urlStr, employeeData).pipe(
      catchError(this.handleError)
    );
  }

// Endpoint to list employees
listEmployees(order: number, limit: number, page: number, searchKey: string = ''): Observable<any> {
  const urlStr = `${this.apiUrl}/auth/listEmployees?order=${order}&page=${page}`;

  // Construct the request body
  const requestBody = {
    limit: limit,
    searchKey: searchKey
  };

  return this.http.post(urlStr, requestBody);
}

  
  

  // Endpoint to get a specific employee by ID
  getEmployeeById(id: string ): Observable<any> {
    const urlStr = `${this.apiUrl}/employee/employees/${id}`;
    return this.http.get(urlStr).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: any) {
    console.error('An error occurred:', error); // For demo purposes only
    return throwError(error);
  }
  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && window.localStorage ? !!localStorage.getItem('token') : false;
  }
}
export interface LoginResponse {
  token: string;
  role: string;
  message: string;
}



