import { Component, inject } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-choose-avatar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './choose-avatar.component.html',
  styleUrl: './choose-avatar.component.scss'
})
export class ChooseAvatarComponent {
  authService = inject(FirebaseAuthService);
  router = inject(Router);
  selectedAvatar: string = '';
  avatarIsSelected: boolean = false;
  showPopup: boolean = false;
  registrationFailed: boolean = false;
  errorMassage: String = '';

  regData = this.authService.getStoredRegistrationData();

  completeRegistration() {
    if (this.regData) {
      this.authService.register(this.regData.email, this.regData.username, this.regData.password, this.selectedAvatar).subscribe({
        next: () => {
          console.log('Registration complete with avatar:', this.selectedAvatar);
          this.authService.clearStoredRegistrationData();
          this.showPopup = true;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          if (err.code === 'auth/email-already-in-use') {
            this.registrationFailed = true;
            this.errorMassage = 'Email existiert bereits!';
          } else {
            this.registrationFailed = true;
            this.errorMassage = 'Irgendetwas ist schief gelaufen!';
          }
        }
      });
    } 
  }


}
