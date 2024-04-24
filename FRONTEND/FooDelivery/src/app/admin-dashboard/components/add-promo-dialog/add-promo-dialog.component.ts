import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  inject, Input, Output,
  signal,
  ViewEncapsulation,
  WritableSignal
} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TooltipModule} from "primeng/tooltip";
import {IPromDto} from "../../interfaces/promotion.interface";
import {PromotionService} from "../../services/promotion.service";
import {IProductDTO} from "../../interfaces/product.interface";
import {ProductService} from "../../services/product.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {BadgeModule} from "primeng/badge";

type controlType = 'promotion';

@Component({
  selector: 'app-add-promo-dialog',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    NgClass,
    InputTextareaModule,
    NgIf,
    TooltipModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    MessagesModule,
    StyleClassModule,
    ToastModule,
    BadgeModule,
  ],
  templateUrl: './add-promo-dialog.component.html',
  styleUrl: './add-promo-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AddPromoDialogComponent {

  @Input({ required: true }) product!: IProductDTO | null;

  private nnfb = inject(NonNullableFormBuilder);
  private promoService = inject(PromotionService);
  private productService = inject(ProductService);

  promotions: WritableSignal<IPromDto[] | undefined> = signal(undefined);
  selectedPromotion = signal<IPromDto | undefined>(undefined);
  public percentage = signal<string>('0%');

  @Output()
  onNewPromo: EventEmitter<IPromDto> = new EventEmitter();

  constructor(private messageService: MessageService) { }

  productDialog = signal(false);

  ngOnInit() {
    this.promotions.set(this.promoService.promotions());
  }

  public promoAddForm = this.nnfb.group<any>(
    {
      promotion: this.nnfb.control('', [Validators.required]),
    }
  );

  inputValid(control: controlType): boolean {
    return (
      !!this.promoAddForm.get(control)?.invalid &&
      !!this.promoAddForm.get(control)?.touched
    );
  }

  hideDialog() {
    this.productDialog.set(false);
  }

  addPromo() {
    this.promoService.getAllPromotions();
    this.productDialog.set(true);
  }

  savePromo() {
    if (this.promoAddForm.invalid) return this.promoAddForm.markAllAsTouched();

    const prom = (this.promoAddForm.value['promotion'] as IPromDto);

    if (!this.product?.id) return;

    const idProducto = this.product!.id;
    const idPromo = prom.id;

    this.productService.addPromoToProduct(idProducto, idPromo).subscribe({
      next: () => {
        this.showMessage('Promocion agregada al producto', 'success', 'Exito');
        this.emitPromo(prom);
        setTimeout(() => {
          this.hideDialog();
        }, 500);
      },
      error: () => {
        this.showMessage('No se pudo agregar la promocion al producto', 'error', 'Error');
      }
    });
  }

  onPromotionChange($event: DropdownChangeEvent) {
    this.selectedPromotion.set($event.value);
    this.percentage.set($event.value.percentage + '%');
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }

  emitPromo(prom: IPromDto) {
    this.onNewPromo.emit(prom);
  }
}
