import {ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {TitleComponent} from "../../../shared/title/title.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {UserService} from "../../pages/usuarios/services/user.service";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'header-admin',
  standalone: true,
  imports: [
    TitleComponent,
    NgClass,
    MenubarModule,
    NgOptimizedImage,
    StyleClassModule,
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderAdminComponent implements OnInit {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.items = [
      {
        label: this.user(),
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-power-off',
            command: () => this.logout(),
          },
        ],
      },
    ];
  };

  items: MenuItem[] | undefined;

  private user = computed<string>(
    () => this.userService.getUserFromStorage().fullName
  );

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
