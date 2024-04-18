import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  isEditing: boolean = false;
  editedFullName: string = '';
  editedAlias: string = '';
  editedPhone: string = '';
  editedEmail: string = '';
  editedProfileImage: string = ''; 
  showCurrentOrdersScreen: boolean = false;
  showOrderHistoryScreen: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
        this.editedFullName = this.user?.fullName || '';
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
        fullName: this.editedFullName,
        alias: this.editedAlias,
        phone: this.editedPhone,
        email: this.editedEmail,
     
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

  // Método para cancelar la edición y restablecer los valores originales
  cancelEdit(): void {
    this.isEditing = false;
    // Restablecer los valores originales
    this.editedFullName = this.user?.fullName || '';
    this.editedAlias = this.user?.alias || '';
    this.editedPhone = this.user?.phone || '';
    this.editedEmail = this.user?.email || '';
    
  }
 // Método para mostrar la pantalla de "Ordenes en Curso"
 showCurrentOrders(): void {
  this.showCurrentOrdersScreen = true;
  this.showOrderHistoryScreen = false;
}

// Método para mostrar la pantalla de "Historial de Pedidos"
showOrderHistory(): void {
  this.showCurrentOrdersScreen = false;
  this.showOrderHistoryScreen = true;
}
}