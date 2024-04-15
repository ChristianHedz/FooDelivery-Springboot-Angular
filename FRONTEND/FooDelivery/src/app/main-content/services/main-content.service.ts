import { Injectable, inject } from '@angular/core';
import { ProductApiService } from '../../core/api/product-api.service';

@Injectable({
  providedIn: 'root',
})
export class MainContentService {
  private productApiService = inject(ProductApiService);

  constructor() {}

  getProducts() {
    let products = this.productApiService.getAllProducts();
    return products;
  }
}
