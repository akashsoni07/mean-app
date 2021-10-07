import { Component, OnInit } from '@angular/core';
import { ApiConfig } from 'src/app/config/api.config';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  token = JSON.parse(localStorage.getItem('emailToken')!);
  success: boolean = false;
  error: string = '';
  constructor(private apiService: ApiService, private apiConfig: ApiConfig) {}

  ngOnInit(): void {
    this.apiService
      .postDataToService(this.apiConfig.verifyEmail, { token: this.token })
      .subscribe(
        (res: any) => {
          this.success = true;
        },
        (err) => {
          this.error = err.error.message;
        }
      );
  }
}
