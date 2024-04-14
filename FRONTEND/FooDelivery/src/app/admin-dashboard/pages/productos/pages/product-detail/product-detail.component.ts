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

  messageNotData = [
    { severity: 'info', summary: 'Sin informacion ', detail: '' },
  ];

  // Variables
  public productId: string | null = null;
  public product = signal<IProductDTO | null>(null);

  constructor( private productService: ProductService ) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.productId) {
      const id = Number(this.productId);
      this.productService
        .getProductByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (product) => this.product.set(product),
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

  confirmDeleteUser() {
    this.productService.confirmDeleteProduct(this.product()!.id);
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }
}
