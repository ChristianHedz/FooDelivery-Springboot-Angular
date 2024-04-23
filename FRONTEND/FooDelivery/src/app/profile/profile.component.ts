import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Order } from '../services/order';
import { StatusOrder } from '../services/order';

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
  currentOrders: Order[] = []; 
  orderHistory: Order[] = []; 
  statusOrder = StatusOrder;
  progressWidth: string = '50%';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserOrders();
  }
  
  // Actualiza la barra de progreso cuando se recibe el estado de la orden
  updateProgress(status: StatusOrder): void {
    const progressPercentage = {
      [StatusOrder.IN_PROGRESS]: '50%',
      [StatusOrder.ON_ROUTE]: '75%',
      [StatusOrder.DELIVERED]: '100%',
      [StatusOrder.CANCELED]: '0%' 
    };
    this.progressWidth = progressPercentage[status];
  }


  getUserOrders(): void {
    this.authService.getUserOrders().subscribe(
      (orders: Order[]) => {
        this.currentOrders = orders.filter(order => order.status !== StatusOrder.DELIVERED && order.status !== StatusOrder.CANCELED);
        this.orderHistory = orders;
      },
      (error) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }
  
  getUserProfile(): void {
    this.authService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
        this.editedFullName = this.user?.fullName || '';
        this.editedAlias = this.user?.alias || '';
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

  showCurrentOrders(): void {
    this.showCurrentOrdersScreen = true;
    this.showOrderHistoryScreen = false;
  }

  showOrderHistory(): void {
    this.showCurrentOrdersScreen = false;
    this.showOrderHistoryScreen = true;
  }
}