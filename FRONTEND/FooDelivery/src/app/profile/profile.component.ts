import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../home/header/header.component';
import { NavComponent } from '../home/nav/nav.component';
import { FooterComponent } from '../home/footer/footer.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderComponent,NavComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'

})

export class ProfileComponent implements OnInit {
  user: User | undefined;
  isEditing: boolean = false;

  editedFirstName: string = '';
  editedAlias: string = '';
  editedPhone: string = '';
  editedEmail: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
        this.editedFirstName = this.user?.fullName || '';
        this.editedAlias = this.user?.alias || '';
        this.editedPhone = this.user?.phone || '';
        this.editedEmail = this.user?.email || '';
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.user) {
      this.user = {
        ...this.user,
        fullName: this.editedFirstName,
        alias: this.editedAlias,
        phone: this.editedPhone,
        email: this.editedEmail
      };

this.authService.updateUserProfile(this.user).subscribe({
  next: () => {
    console.log('Perfil de usuario actualizado con éxito');
    this.isEditing = false;
  },
  error: (error) => {
    console.error('Error updating user profile:', error);
  }
});
    }
  }
}