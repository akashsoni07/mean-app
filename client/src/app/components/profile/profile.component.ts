import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser!: User
  currentUserSubscription: Subscription;

  constructor(private apiService: ApiService) {
    this.currentUserSubscription = this.apiService.currentUser.subscribe(
      (res) => {
        this.currentUser = res
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
}
