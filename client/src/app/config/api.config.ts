import { Injectable } from "@angular/core";

@Injectable()
export class ApiConfig {
  readonly baseUrl = "/api/user";

  readonly login = "/login";
  readonly signup = "/signup";
  readonly profile = "/profile";
  readonly editProfile = "/edit-profile";
  readonly resetPassword = "/reset-password";
  readonly changePassword = "/change-password";
  readonly verifyEmail = "/verify-email";
  readonly forgotPassword = "/forgot-password";
}
