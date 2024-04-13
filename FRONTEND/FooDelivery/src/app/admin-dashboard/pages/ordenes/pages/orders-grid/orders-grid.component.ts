import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {JsonPipe, TitleCasePipe} from "@angular/common";
import { OrderService } from "../../../../services/order.service";
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
  selector: 'orders-grid-admin',
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
  templateUrl: './orders-grid.component.html',
  styleUrl: './orders-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export default class OrdersGridComponent {
  orderService = inject(OrderService);

  messageNotData = [
    { severity: 'info', summary: 'No hay ordenes que mostrar', detail: '' },
  ];


}
