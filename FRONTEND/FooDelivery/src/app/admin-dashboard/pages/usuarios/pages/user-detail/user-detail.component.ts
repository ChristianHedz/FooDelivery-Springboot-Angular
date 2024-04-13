import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {IUser} from "../../../../../core/interfaces/user/User.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TitleCasePipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {StyleClassModule} from "primeng/styleclass";
import {AvatarModule} from "primeng/avatar";
import {MessagesModule} from "primeng/messages";

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
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class UserDetailComponent implements OnInit {
  // Services
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private router = inject(Router);

  messageNotData = [
    { severity: 'info', summary: 'Sin informacion ', detail: '' },
  ];

  // Variables
  public userId: string | null = null;
  public user = signal<IUser | null>(null);

  constructor( private userService: UserService ) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.userId) {
      const id = Number(this.userId);
      this.userService
        .getUserByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (lottery) => this.user.set(lottery),
          error: (err) => {
            console.error('Error: ', {...err});
            this.showMessage(`No se pudo obtener datos del usuario.`, 'error', 'Ocurrio un error');
            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/usuarios']);
            }, 1200);
          },
        });
    }
  }

  confirmDeleteUser() {
    this.userService.confirmDeleteUser(this.user()!.id);
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }
}
