import {
  Component,
  booleanAttribute,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  signal, OnInit
} from '@angular/core';
import {IUser} from "../../core/interfaces/user/User.interface";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {Router, RouterLink} from "@angular/router";
import {MenuModule} from "primeng/menu";
import {UserService} from "../../admin-dashboard/services/user.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {MenubarModule} from "primeng/menubar";
import {StyleClassModule} from "primeng/styleclass";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'user-card',
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
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class UserCardComponent implements OnInit {

  noName: string = 'NoName';

  // Service
  private router = inject(Router);

  // Inputs
  @Input({ required: true }) user!: IUser;
  @Input({ transform: booleanAttribute }) isAdmin: boolean = false;

  public menus = signal<MenuItem[]>([]);


  constructor( private userAdminService: UserService ) {}

  ngOnInit(): void {
    // Menu
    this.menus.set([
      {
        label: 'Opciones',
        items: [
          {
            label: 'Actualizar',
            icon: 'pi pi-pencil',
            command: () => {
              this.goRuteUpdate();
            },
          },
          {
            label: 'Eliminar',
            icon: 'pi pi-trash',
            disabled: this.user && this.user.role === 'ADMIN',
            command: () => this.userAdminService.confirmDeleteUser(this.user.id) //this.confirm1(this.user.id!),
          },
        ],
      },
    ]);
  }

  goRuteUpdate() {
    this.router.navigate([
      '/admin/dashboard/usuario',
      this.user.id,
      'editar',
    ]);
  }

}
