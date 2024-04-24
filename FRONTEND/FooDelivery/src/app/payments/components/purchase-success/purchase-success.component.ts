import { Component,inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent {
  private router = inject(Router);
  order: any;
  totalPrice!: number;

  ngOnInit() {
    const orderData = sessionStorage.getItem('order');
    if (orderData !== null) {
      this.order = JSON.parse(orderData).products;
      this.totalPrice = JSON.parse(orderData).totalPrice;
    }
  }

  goFollowUp(){
    this.router.navigateByUrl('/profile');
  }
}
