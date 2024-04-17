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
import {ImageModule} from "primeng/image";
import {IPromDto} from "../../../../interfaces/promotion.interface";
import {PromotionService} from "../../../../services/promotion.service";
import {BadgeModule} from "primeng/badge";
import {TooltipModule} from "primeng/tooltip";
import {AddPromoDialogComponent} from "../../../../components/add-promo-dialog/add-promo-dialog.component";
import {TableProductsPromoComponent} from "../../../../components/table-products-promo/table-products-promo.component";
import {IProduct} from "../../../../interfaces/product.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-promotion-detail',
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
    BadgeModule,
    TooltipModule,
    AddPromoDialogComponent,
    TableProductsPromoComponent,
  ],
  templateUrl: './promotion-detail.component.html',
  styleUrl: './promotion-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class PromotionDetailComponent implements OnInit {
  // Services
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private promotionService = inject(PromotionService);

  messageData = signal([
    { severity: 'info', summary: 'Sin informacion ', detail: '' },
  ]);

  // Variables
  public promoId: string | null = null;

  // Signals
  public promotion = signal<IPromDto | null>(null);
  public percentage = signal<string>('0%');// Inputs
  public products = signal<IProduct[]>([]);

  constructor( private promoService: PromotionService ) {
    this.promoId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

    if (this.promoId) {
      const id = Number(this.promoId);
      this.promoService
        .getPromotionByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (promo) => {
            this.percentage.set(promo.percentage + '%');
            this.promotion.set(promo);
            this.messageData.set([
              { severity: 'info', summary: 'Cargando... ', detail: '' },
            ]);
            this.getProducts();
          },
          error: (err) => {
            console.error('Error: ', {...err});
            this.showMessage(`No se pudo obtener datos de la promoción.`, 'error', 'Ocurrio un error');
            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/promociones']);
            }, 1200);
          },
        });
    }
  }

  confirmDeletePromo() {
    this.promoService.confirmDeletePromotion(this.promotion()!);
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }

  updateProducts() {
    this.getProducts();
  }

  getProducts() {
    this.promotionService.getProductsFromPromo(this.promotion()!.id).pipe(
      tap(res => this.products.set(res.products))
    ).subscribe({
      error: (err) => {
        console.error(err);
        this.messageData.set([
          { severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' },
        ]);
      }
    });
  }

  getMessage() {
    return this.messageData();
  }
}
