import { Component, inject } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../services/product.service';
import { IProductDTO } from '../../admin-dashboard/interfaces/product.interface';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  imports: [ProductDetailComponent],
})
export class ProductsListComponent {
  private productService = inject(ProductService);
  products: IProductDTO[] = [];
  newProducts: IProductDTO[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.newProducts = this.mapProducts();
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      },
    });
  }

  mapProducts() {
    let newProducts = this.products.map((product) => ({
      ...product,
      count: 0,
    }));
    return newProducts;
  }

  increment(productId: number | undefined) {
    this.newProducts.forEach((product) => {
      if (product.count === undefined) {
        product.count = 0;
      }
      if (productId == product.id) {
        product.count += 1;
      }
    });
  }

  decrement(productId: number | undefined) {
    this.newProducts.forEach((product) => {
      if (product.count === undefined) {
        product.count = 0;
      }
      if (productId == product.id) {
        product.count -= 1;
      }
    });
  }
}
