import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NtsplAdminComponent } from './ntspl-admin/ntspl-admin.component';
import { SetPasswordComponent } from './user-details/set-password.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { OtpFieldComponent } from './otp-field/otp-field.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './Authguard/auth.guard';
import { SignPasswordComponent } from './sign/sign-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/ntspl', pathMatch: 'full' },
  { path: 'ntspl', component: NtsplAdminComponent },
  { path: 'reset-password', component: SignPasswordComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'reset-password/MeetingList', component: MeetingListComponent },
  { path: 'otp', component: OtpFieldComponent },
  { path: 'reset-otp', component: ResetPasswordComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
