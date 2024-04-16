import {inject, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import { ProductApiService } from "../../core/api/product-api.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {IProductDTO, IProductWithPromoDTO} from "../interfaces/product.interface";

interface State {
  products: any[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productApiService = inject(ProductApiService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products = signal<any[]>([]);

  constructor() {
    this.getAllProducts();
  }

  createProductByAdmin( product: IProductDTO ) {
    return this.productApiService.createProductByAdmin(product).pipe(
      tap((response) => this.showMessage("Producto creado exitosamente")),
      tap( () => this.getAllProducts()),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/productos'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al crear el producto: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Producto no creado!',
          detail: "Ocurrio un error mientras se creaba el producto.",
        });
        return throwError( () => "Error al crear el producto.");
      })
    );
  }

  updateProductByAdmin( product: IProductDTO ) {
    return this.productApiService.updateProductByAdmin( product ).pipe(
      tap((response) => this.showMessage("Producto actualizado exitosamente")),
      tap( () => this.getAllProducts()),
      tap((_) => {
        setTimeout(() => {
          this.goRouteUpdate(Number(product!.id));
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al actualizar el producto: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Producto no actualizado!',
          detail: "Ocurrio un problema al intentar actualizar el producto.",
        });
        return throwError( () => "Error al actualizar el producto");
      })
    );
  }

  confirmDeleteProduct(id: number | undefined) {
    if (id === undefined) return;
    console.log('id', id);

    return this.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar este producto?',
      header: 'Eliminar producto',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteProduct(id).subscribe({
        next: (response) => {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Producto eliminado!',
            detail: "El producto fue eliminado exitosamente.",
          });

        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error al eliminar el producto',
            detail: error,
          });
        },
      }),
    });
  }

  private deleteProduct(productId: number) {
    return this.productApiService.deleteProductByAdmin(productId).pipe(
      tap(() => {
        this.products.update((usersArr ) =>
          usersArr.filter((user) => user.id !== productId)
        );
      }),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/productos'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al eliminar el producto: ', error);
        return throwError( () => "Error al eliminar el producto");
      })
    );
  };

  getProductByAdmin(id: number): Observable<IProductDTO> {
    return this.productApiService
      .getProductByAdmin(id)
      .pipe(map((response) => response));
  }

  getAllProducts() {
    this.productApiService.getAllProducts()
        .subscribe( {
          next: response => {
            this.products.set(response);
          },
          error: (error) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Error al obtener lista de productos',
              detail: error,
            });
            return error;
          },
        }
      );
  }

  getPromoFromProduct(id: number): Observable<IProductWithPromoDTO> {
    return this.productApiService
      .getPromoFromProduct(id)
      .pipe(map((response) => response));
  }

  addPromoToProduct(idProduct: number, idPromo: number): Observable<any> {
    return this.productApiService
      .addPromoToProduct(idProduct, idPromo)
      .pipe(map((response) => response ));
  }

  private goRouteUpdate(id: number) {
    this.router.navigate([
      '/admin/dashboard/producto',
      id,
      'editar',
    ]);
  }

  showMessage(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Listo!',
      detail: message,
    });
  }

}
