import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProductDTO } from '../../admin-dashboard/interfaces/product.interface';
import { ModalBuyComponent } from './modal-buy/modal-buy.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  imports: [ModalBuyComponent, FormsModule],
})
export class ProductsListComponent {
  private productService = inject(ProductService);
  products: IProductDTO[] = [];
  newProducts: IProductDTO[] = [];
  carritoProducts: Map<number, IProductDTO> = new Map();
  cantidadDeProductosCarrito: number = 0;
  precioTotalProductos: number = 0;
  totalFinal: number = 0;
  priceDelivery: number = 500;
  showInput: boolean = false;
  address: string = 'Caseros 3445 (N)';
  selectedProduct?: IProductDTO;

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
    return this.products.map((product) => ({ ...product, count: 0 }));
  }

  increment(productId: number | undefined) {
    if (productId) {
      this.newProducts.forEach((product) => {
        if (product.id === productId && product.count != undefined) {
          product.count += 1;
          this.cantidadDeProductosCarrito++;
          this.precioTotalProductos += product.price;
          this.carritoProducts.set(product.id, product);
          this.updateTotal();
        }
      });
    }
  }

  decrement(productId: number | undefined) {
    if (productId) {
      this.newProducts.forEach((product) => {
        if (product.count != undefined)
          if (product.id === productId && product.count > 0) {
            product.count -= 1;
            this.cantidadDeProductosCarrito--;
            this.precioTotalProductos -= product.price;
            if (product.count === 0) {
              this.carritoProducts.delete(product.id);
            } else {
              this.carritoProducts.set(product.id, product);
            }
            this.updateTotal();
          }
      });
    }
  }

  deleteProduct(productId: number | undefined) {
    this.newProducts.forEach((product) => {
      if (product.count != undefined && product.id != undefined)
        if (product.id === productId && product.count > 0) {
          this.cantidadDeProductosCarrito -= product.count;
          this.precioTotalProductos -= product.price * product.count;
          product.count = 0;
          this.carritoProducts.delete(productId);
          this.updateTotal();
        }
    });
  }

  updateTotal(): void {
    this.totalFinal = this.precioTotalProductos + this.priceDelivery;
  }

  toggleInput(): void {
    this.showInput = !this.showInput; // Cambia el estado de visibilidad
  }

  submitAddress(): void {
    this.address;
  }

  openModal(product: IProductDTO): void {
    this.selectedProduct = product;
  }
}
