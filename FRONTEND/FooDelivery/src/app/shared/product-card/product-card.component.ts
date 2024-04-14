import {
  Component,
  booleanAttribute,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {IProductDTO} from "../../admin-dashboard/interfaces/product.interface";
import {ProductService} from "../../admin-dashboard/services/product.service";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    BadgeModule,
    RouterLink,
    MenuModule,
    RippleModule,
    MenubarModule,
    StyleClassModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    NgOptimizedImage,
    RatingModule,
    FormsModule,
    CurrencyPipe,
    ImageModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductCardComponent {

  // Service
  private router = inject(Router);

  // Inputs
  @Input({ required: true }) product!: IProductDTO;
  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  //vars
  rating: number = 3;
  inventoryStatus: string = 'Disponible';

  productService: ProductService = inject(ProductService);

  constructor(

  ) { }

  goRouteUpdate() {
    this.router.navigate([
      '/admin/dashboard/productos',
      this.product.id,
      'editar',
    ]);
  }

}
