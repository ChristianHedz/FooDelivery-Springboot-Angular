import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {IProduct} from "../../interfaces/product.interface";
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {PromotionService} from "../../services/promotion.service";
import {ImageModule} from "primeng/image";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-table-products-promo',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    RippleModule,
    CurrencyPipe,
    NgOptimizedImage,
    ImageModule,
    RouterLink
  ],
  templateUrl: './table-products-promo.component.html',
  styleUrl: './table-products-promo.component.css'
})
export class TableProductsPromoComponent implements  OnInit {

  @Input( { required: true }) products!: IProduct[];

  private router = inject(Router);

  // Services
  promotionService = inject(PromotionService);

  ngOnInit() {

  }

  routeProductToDetail(id: number) {
    this.router.navigate([
      '/admin/dashboard/producto',
      id
    ]);
  }
}
