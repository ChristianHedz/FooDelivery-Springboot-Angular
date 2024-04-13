import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {UserService} from "../../services/user.service";
import {StyleClassModule} from "primeng/styleclass";
import adminRoutes from "../../admin.routes";
import {IUser, IUserAuth} from "../../../core/interfaces/user/User.interface";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'header-admin',
  standalone: true,
  imports: [
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
  private breakpointObserver = inject(BreakpointObserver);

  private userAuth = computed<IUserAuth>(
    () => this.userService.getUserFromStorage()
  );

  private user = signal<IUser | undefined>(undefined);

  isAdmin: boolean = false;

  // Obtén los children de adminRoutes y extrae sus títulos
  public menuItems = adminRoutes
    .filter(route => route && route.path) // Filtra las rutas que no tengan path: path: ''
    .filter(route => !route.path?.includes(':')) // Filtra las rutas que tengan parámetros
    .filter(route => !route.path?.includes('/')) // Filtra las rutas que tengan subrutas
    .map(route => ({
      label: route.path.split('')[0].toUpperCase() + route.path.slice(1),
      routerLink: route.path,
      icon: `pi ${route.title}`
    }));

  private items = signal<MenuItem[]>([
    {
      label: 'ADMINISTRACIÓN',
      icon: 'pi pi-fw pi-chevron-down',
      items: [...this.menuItems],
    },
    {
      label: this.user()?.fullName,
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-power-off',
          command: () => this.logout(),
        },
      ],
    },
  ]);

  private isMobile = this.breakpointObserver.observe(Breakpoints.Handset);
  menus = signal(this.isMobile ? this.items() : [this.items()[1]]);

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(
      user => this.user.set(user)
    )

    this.isMobile.subscribe(result => {
      this.updateMenu(result.matches);
    });

    this.isAdmin = this.user()?.role === 'ADMIN';
  };

  private updateMenu(isMobile: boolean): void {
    const [, userMenu] = this.items();
    this.menus.set( isMobile && this.isAdmin ? this.items() : [userMenu]);
  }


  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
