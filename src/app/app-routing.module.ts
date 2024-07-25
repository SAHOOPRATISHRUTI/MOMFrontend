import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NtsplAdminComponent } from './ntspl-admin/ntspl-admin.component';
import { SignPasswordComponent } from './sign/sign-password.component';
import { SetPasswordComponent } from './user-details/set-password.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { OtpFieldComponent } from './otp-field/otp-field.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/ntspl', pathMatch: 'full' },
  { path: 'ntspl', component: NtsplAdminComponent },
  { path: 'reset-password', component: SignPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  {path:'reset-password/MeetingList',component:MeetingListComponent},
  {path:'otp',component:OtpFieldComponent},
  {path:'reset-otps',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
