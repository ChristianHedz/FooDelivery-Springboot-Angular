import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CurrencyPipe, TitleCasePipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {StyleClassModule} from "primeng/styleclass";
import {AvatarModule} from "primeng/avatar";
import {MessagesModule} from "primeng/messages";
import {IProductDTO} from "../../../../interfaces/product.interface";
import {ProductService} from "../../../../services/product.service";
import {ImageModule} from "primeng/image";
import {IPromDto} from "../../../../interfaces/promotion.interface";
import {TooltipModule} from "primeng/tooltip";
import {AddPromoDialogComponent} from "../../../../components/add-promo-dialog/add-promo-dialog.component";
import {PromotionService} from "../../../../services/promotion.service";
import {BadgeModule} from "primeng/badge";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    TitleCasePipe,
    DividerModule,
    ChipModule,
    ButtonModule,
    RippleModule,
    RouterLink,
    ToastModule,
    ConfirmDialogModule,
    StyleClassModule,
    AvatarModule,
    MessagesModule,
    RouterLinkActive,
    CurrencyPipe,
    ImageModule,
    TooltipModule,
    AddPromoDialogComponent,
    BadgeModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class ProductDetailComponent implements OnInit {

  // Services
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private router = inject(Router);

  //signals
  messagePromoSignal = signal(
    [{ severity: 'info', summary: 'Sin informacion ', detail: '' }],
  );
  messageNotDataSignal = signal(
    [{ severity: 'info', summary: 'Sin informacion ', detail: '' }],
  );


  // Variables
  public productId: string | null = null;

  // Signals
  public product = signal<IProductDTO | null>(null);
  public promotion = signal<IPromDto | null>(null);

  constructor( private productService: ProductService, private promotionService: PromotionService) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.productId) {
      const id = Number(this.productId);
      this.productService
        .getProductByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (product) => {
            this.product.set(product);
            this.getPromoFromProduct(product.id);
          },
          error: (err) => {
            console.error('Error: ', {...err});
            this.showMessage(`No se pudo obtener datos del producto.`, 'error', 'Ocurrio un error');
            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/productos']);
            }, 1200);
          },
        });
    }
  }

  confirmDeleteProduct() {
    this.productService.confirmDeleteProduct(this.product()!.id);
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }

  private getPromoFromProduct(id: number | undefined) {
    this.messagePromoSignal.set([{severity: 'info', summary: 'Cargando datos...', detail: ''}]);
    if(id === undefined) return;

    this.productService
      .getPromoFromProduct(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {

          if( res.promotion === null) {
            this.promotion.set(null);
            this.messagePromoSignal.set([{severity: 'info', summary: 'Sin promoción', detail: 'Agregue una promoción.'}]);
            return;
          }


          this.messagePromoSignal.set([{severity: 'success', summary: `${res.promotion.code}.`, detail: `${res.promotion.description}`}]);
          this.promotion.set(res.promotion);
        },
        error: (err) => {
          console.error('Error: ', {...err});
          this.messagePromoSignal.set([{severity: `No se pudo obtener datos de la promoción.`, summary: 'error', detail: 'Ocurrio un error'}]);
        },
      });
  }

  getMessagePromo() {
    return this.messagePromoSignal();
  }

  getMessageNotData() {
    return this.messageNotDataSignal();
  }

  updatePromo() {
    this.getPromoFromProduct(this.product()!.id);
  }

  onNewPromo(prom: IPromDto) {
    this.messagePromoSignal.set([{severity: 'success', summary: `${prom.code}.`, detail: `${prom.description}`}]);
    this.promotion.set(prom);
  }

  deletePromo() {
    if (this.promotion() === null) return;
    this.confirmDeletePromoFromProduct(this.product()!.id);
  }

  confirmDeletePromoFromProduct(id: number | undefined) {

    if (id === undefined) return;

    return this.productService.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar la promocion?',
      header: 'Eliminar la promocion del producto',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.productService.deletePromoFromProduct(id)
        .pipe(
          tap(() => {
            this.promotion.set(null);
            this.messagePromoSignal.set([{severity: 'info', summary: 'Sin promoción', detail: 'Agregue una promoción.'}]);
          })
          )
        .subscribe({
        next: (response) => {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Promocion eliminada del producto!',
            detail: "El producto esta ya sin promocion.",
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error al eliminar la promocion del producto',
            detail: error,
          });
        },
      }),
    });
  }

}
