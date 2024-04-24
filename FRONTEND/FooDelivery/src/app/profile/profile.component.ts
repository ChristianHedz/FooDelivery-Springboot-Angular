import {Component, OnInit, signal} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Order, StatusOrder} from '../services/order';
import {
  TableProductsPromoComponent
} from "../admin-dashboard/components/table-products-promo/table-products-promo.component";
import {OrderItemsComponent} from "./components/order-card-customer/order-items.component";
import {UserDTO} from "../admin-dashboard/interfaces/user.interface";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TableProductsPromoComponent, OrderItemsComponent],
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
  // progressWidth: string = '0%';
  progressWidth = signal('0%');

  statusBarClass = signal('');
  statusTextClass = signal('text-orange-500');
  svgStrokeColor = signal('#FA8232');
  svgFillColor = signal('#FD7E14');

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserOrders();
  }

  // Actualiza la barra de progreso cuando se recibe el estado de la orden
  updateProgress(status: StatusOrder): void {
    const progressPercentage: Record<string, string> = {
      [StatusOrder.IN_PROGRESS]: '40%',
      [StatusOrder.ON_ROUTE]: '67%',
      [StatusOrder.DELIVERED]: '100%',
      [StatusOrder.CANCELED]: '0%'
    };

    if (status in StatusOrder) {
      this.statusBarClass.set((Number(StatusOrder[status]) === 3) ? 'canceled_bar' : '');
      this.statusTextClass.set((Number(StatusOrder[status]) === 3) ? 'canceled_text' : 'text-orange-500');
      this.svgStrokeColor.set((Number(StatusOrder[status]) === 3) ? 'darkred' : '#FA8232');
      this.svgFillColor.set((Number(StatusOrder[status]) === 3) ? 'darkred' : '#FD7E14');
      const statusString = StatusOrder[status];
      this.progressWidth.set(progressPercentage[statusString]);
    }

  }


  getUserOrders(): void {
    this.authService.getUserOrders().subscribe(
      (orders: Order[]) => {
        this.currentOrders = orders.filter(order => order.status !== StatusOrder.DELIVERED && order.status !== StatusOrder.CANCELED);
        this.orderHistory = orders;
        this.updateProgress(orders[0].status);
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

  refreshOrders() {
    console.log('Refresingh orders...');
    this.getUserOrders();
  }
}
