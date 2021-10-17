import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { GlobalAlertComponent } from './components/shared/global-alert/global-alert.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/shared/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EncrDecrService } from './services/encrdecr.service';
import { ApiConfig } from './config/api.config';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    GlobalAlertComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    ProfileComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    EncrDecrService,
    ApiConfig,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
