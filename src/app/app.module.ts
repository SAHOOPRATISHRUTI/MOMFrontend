import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NtsplAdminComponent } from './ntspl-admin/ntspl-admin.component';
import { SignPasswordComponent } from './sign/sign-password.component';
import { SetPasswordComponent } from './user-details/set-password.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OtpFieldComponent } from './otp-field/otp-field.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatRadioModule } from '@angular/material/radio'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NtsplAdminComponent,
    SignPasswordComponent,
    SetPasswordComponent,
    MeetingListComponent,
    OtpFieldComponent,
    ResetPasswordComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    MatButtonModule,
    MatStepperModule,
    MatRadioModule,
    MatSelectModule, // Add MatSelectModule to imports
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
