import {
  Component,
  booleanAttribute,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject, signal,
} from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {CurrencyPipe, NgOptimizedImage, PercentPipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";
import {DividerModule} from "primeng/divider";
import {IPromDto} from "../../admin-dashboard/interfaces/promotion.interface";
import {PromotionService} from "../../admin-dashboard/services/promotion.service";
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

registerLocaleData(es);

@Component({
  selector: 'promotion-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    BadgeModule,
    RouterLink,
    MenuModule,
    RippleModule,
    MenubarModule,
    StyleClassModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    NgOptimizedImage,
    RatingModule,
    FormsModule,
    CurrencyPipe,
    ImageModule,
    DividerModule,
    PercentPipe,
  ],
  templateUrl: './promotion-card.component.html',
  styleUrl: './promotion-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class PromotionCardComponent {

  // Service
  private router = inject(Router);

  //Signals
  percentage = signal<string>('0%');

  // Inputs
  @Input({ required: true }) promotion!: IPromDto;
  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  promotionService: PromotionService = inject(PromotionService);

  constructor(

  ) { }

  goRouteUpdate() {
    this.router.navigate([
      '/admin/dashboard/promociones',
      this.promotion.id,
      'editar',
    ]);
  }

}
