import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {JsonPipe, TitleCasePipe} from "@angular/common";
import { PromotionService } from "../../../../services/promotion.service";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {MessagesModule} from "primeng/messages";
import {UserCardComponent} from "../../../../../shared/user-card/user-card.component";
import {StyleClassModule} from "primeng/styleclass";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'promotions-grid-admin',
  standalone: true,
  imports: [
    TitleCasePipe,
    JsonPipe,
    ButtonModule,
    RippleModule,
    RouterLink,
    DividerModule,
    MessagesModule,
    UserCardComponent,
    StyleClassModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './promotions-grid.component.html',
  styleUrl: './promotions-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export default class PromotionsGridComponent {
  promotionService = inject(PromotionService);

  messageNotData = [
    { severity: 'info', summary: 'No hay promociones que mostrar', detail: '' },
  ];


}
