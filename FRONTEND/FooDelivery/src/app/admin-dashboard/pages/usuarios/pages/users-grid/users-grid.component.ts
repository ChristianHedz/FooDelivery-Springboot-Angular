import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {UsersTableAdminDashboardComponent} from "../../components/users-table/users-table.component";
import {JsonPipe, TitleCasePipe} from "@angular/common";
import {UserService} from "../../services/user.service";
import {DashboardTableType} from "../../../../interfaces/dashboard-table.enum";
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
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    UsersTableAdminDashboardComponent,
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
  templateUrl: './users-grid.component.html',
  styleUrl: './users-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export default class UsersGridComponent {
  userService = inject(UserService);

  messageNotData = [
    { severity: 'info', summary: 'No hay usuarios que mostrar', detail: '' },
  ];


}
