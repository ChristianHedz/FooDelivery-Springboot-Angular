import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IUser} from "../../../../../core/interfaces/user/User.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TitleCasePipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {StyleClassModule} from "primeng/styleclass";

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
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class UserDetailComponent {
  // Services
  private userSer = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // Variables
  public userId: string | null = null;
  public user = signal<IUser | null>(null);

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.userId) {
      const id = Number(this.userId);
      this.userSer
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

  confirmDeleteLottery() {
    this.userSer.confirmDeleteUser(this.user()?.id!);
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }
}
