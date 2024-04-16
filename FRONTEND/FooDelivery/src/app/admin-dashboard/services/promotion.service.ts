import {inject, Injectable, signal} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import { PromotionApiService } from "../../core/api/promotion-api.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {IPromDto, IPromReq} from "../interfaces/promotion.interface";

interface State {
  products: any[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class PromotionService {

  private promotionApiService = inject(PromotionApiService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  promotions = signal<any[]>([]);

  constructor() {
    this.getAllPromotions();
  }

  createPromotionByAdmin( promotion: IPromReq ) {
    return this.promotionApiService.createPromotionByAdmin( promotion ).pipe(
      tap((response) => this.showMessage("Promoción creada exitosamente")),
      tap( () => this.getAllPromotions()),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/promociones'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al crear la promoción: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Promoción no creada!',
          detail: "Ocurrio un error mientras se creaba la promoción.",
        });
        return throwError( () => "Error al crear la promoción.");
      })
    );
  }

  updatePromotionByAdmin( promotion: IPromReq ) {
    return this. promotionApiService.updatePromotionByAdmin( promotion ).pipe(
      tap(( promo) => this.showMessage("Promoción actualizada exitosamente")),
      tap( () => this.getAllPromotions()),
      tap((_) => {
        setTimeout(() => {
          if (promotion.id)
            this.goRouteUpdate(promotion.id);
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al actualizar la promoción: ', error);
        this.messageService.add({
          key: 'toast',
          severity: 'error',
          summary: 'Promoción no actualizada!',
          detail: "Ocurrio un problema al intentar actualizar la promoción.",
        });
        return throwError( () => "Error al actualizar la promocion");
      })
    );
  }

  confirmDeletePromotion(promo: IPromDto) {

    return this.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar esta promoción?',
      header: 'Eliminar promoción',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deletePromotion(promo).subscribe({
        next: (response) => {

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Promoción eliminada!',
            detail: "La promoción fue eliminada exitosamente.",
          });

        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error al eliminar la promoción',
            detail: error,
          });
        },
      }),
    });
  }

  private deletePromotion( promo: IPromDto ) {
    return this.promotionApiService.deletePromotionByAdmin( promo ).pipe(
      tap(() => {
        this.promotions.update(( promsArr ) =>
          promsArr.filter((prom) => prom.id !== promo.id)
        );
      }),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/promociones'])
        }, 1200);
      }),
      catchError((res) => {
        console.log('Error al eliminar la promoción: ', res);
        return throwError( () => "Error al eliminar la promoción");
      })
    );
  };

  getPromotionByAdmin( id: number ): Observable<any> {
    return this.promotionApiService
      .getPromotionByAdmin(id)
      .pipe(map((response) => response));
  }

  getAllPromotions() {
    this.promotionApiService.getAllPromotions()
        .subscribe( {
          next: response => {
            console.log('Promotions: ', response);
            this.promotions.set(response);
          },
          error: (error) => {
            this.messageService.add({
              key: 'toast',
              severity: 'error',
              summary: 'Error al obtener lista de promociones',
              detail: error,
            });
            return error;
          },
        }
      );
  }

  private goRouteUpdate(id: number) {
    this.router.navigate([
      '/admin/dashboard/promocion',
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
