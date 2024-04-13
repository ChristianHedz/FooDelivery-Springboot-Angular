import {ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation} from '@angular/core';
import {RouterModule} from "@angular/router";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import adminRoutes from "../../admin.routes";
import {UserService} from "../../pages/usuarios/services/user.service";

@Component({
  selector: 'sidebar-admin',
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe,
    SidebarModule,
    NgOptimizedImage,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent {

  private userService = inject(UserService);

  userName = computed<string>(
    () => this.userService.getUserFromStorage().fullName
  );

  // Obtén los children de adminRoutes y extrae sus títulos
  public menuItems = adminRoutes
    .filter(route => route && route.path) // Filtra las rutas que no tengan path: path: ''
    .filter(route => !route.path?.includes(':')) // Filtra las rutas que tengan parámetros
    .filter(route => !route.path?.includes('/')) // Filtra las rutas que tengan subrutas
    .map(route => ({
      label: route.path.split('')[0].toUpperCase() + route.path.slice(1),
      routerLink: route.path,
      icon: `${route.title}`
    }));

}
