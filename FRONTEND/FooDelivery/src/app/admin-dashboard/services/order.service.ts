import {inject, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import { OrderApiService } from "../../core/api/order-api.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {IOrderReq} from "../interfaces/order.interface";

interface State {
  products: any[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private orderApiService = inject(OrderApiService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  orders = signal<any[]>([]);

  constructor() {
    this.getAllOrders();
  }

  createOrderByAdmin( order: IOrderReq ) {
    return this.orderApiService.createOrderByAdmin(order).pipe(
      tap((response) => this.showMessage("Orden creada exitosamente")),
      tap( () => this.getAllOrders()),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/ordenes'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al crear la orden: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Orden no creada!',
          detail: "Ocurrio un error mientras se creaba la orden.",
        });
        return throwError( () => "Error al crear la orden.");
      })
    );
  }

  updateOrderByAdmin( order: IOrderReq ) {
    return this.orderApiService.updateOrderByAdmin( order ).pipe(
      tap((response) => this.showMessage("Orden actualizada exitosamente")),
      tap( () => this.getAllOrders()),
      tap((_) => {
        setTimeout(() => {
          this.goRouteUpdate(order!.id);
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al actualizar la orden: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Orden no actualizada!',
          detail: "Ocurrio un problema al intentar actualizar la orden.",
        });
        return throwError( () => "Error al actualizar la orden");
      })
    );
  }

  confirmDeleteOrder( id: number ) {

    return this.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar esta orden?',
      header: 'Eliminar orden',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteOrder(id).subscribe({
        next: (response) => {

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Orden eliminada!',
            detail: "La orden fue eliminada exitosamente.",
          });

        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error al eliminar la orden',
            detail: error,
          });
        },
      }),
    });
  }

  private deleteOrder( orderId: number ) {
    return this.orderApiService.deleteOrderByAdmin(orderId).pipe(
      tap(() => {
        this.orders.update((ordersArr ) =>
          ordersArr.filter((order) => order.id !== orderId)
        );
      }),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/ordenes'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al eliminar la orden: ', error);
        return throwError( () => "Error al eliminar la orden");
      })
    );
  };

  getOrderByAdmin( id: number ): Observable<any> {
    return this.orderApiService
      .getOrderByAdmin(id)
      .pipe(map((response) => response));
  }

  getAllOrders() {
    this.orderApiService.getAllOrders()
        .subscribe( {
          next: response => {
            console.log('response: ', response);
            this.orders.set(response.content);
          },
          error: (error) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Error al obtener lista de ordenes',
              detail: error.message ? error.message : 'Error desconocido'
            });
            return error;
          },
        }
      );
  }

  private goRouteUpdate(id: number) {
    this.router.navigate([
      '/admin/dashboard/ordenes',
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
