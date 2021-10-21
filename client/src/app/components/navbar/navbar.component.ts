import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser!: User;
  constructor(private router: Router, private apiService: ApiService) {
    this.apiService.currentUser.subscribe(
      (res) => (this.currentUser = res)
    );
  }

  ngOnInit(): void {}

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
