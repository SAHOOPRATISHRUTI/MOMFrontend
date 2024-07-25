import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://192.168.1.242:3000'; 

  constructor(private http: HttpClient) {}

  login1(email: string, password: string): Observable<any> {
    const urlStr = `${this.apiUrl}/login`; 
    return this.http.post(urlStr, { email, password });
  }

  addUsers(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/signup`; 
    return this.http.post(urlStr, userData);  
  }


  generateOtp(email: string): Observable<any> {
    const urlStr = `${this.apiUrl}/generate-otp`;
    return this.http.post(urlStr, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    const urlStr = `${this.apiUrl}/verify-otp`;
    return this.http.post(urlStr, { email, otp });
  }
  resetPassword(email: string, password: string, otp: string, confirmPassword: string): Observable<any> {
    const body = { email, password, otp, nwpassword: confirmPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, body);
  }
}
