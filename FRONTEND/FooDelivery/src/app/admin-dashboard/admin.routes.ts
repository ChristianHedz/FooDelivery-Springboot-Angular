import { Route } from '@angular/router';

export default [
  {
    path: 'usuarios',
    title: 'pi-user',
    loadComponent: () => import('./pages/usuarios/usuarios.component'),
  },
  {
    path: 'ordenes',
    title: 'pi-shopping-cart',
    loadComponent: () => import('./pages/ordenes/ordenes.component'),
  },
  {
    path: 'productos',
    title: 'pi-truck',
    loadComponent: () => import('./pages/productos/productos.component'),
    // providers: [LotteryService],
  },
  {
    path: 'promociones',
    title: 'pi-gift',
    loadComponent: () => import('./pages/promociones/promociones.component'),
  },
  {
    path: '',
    redirectTo: 'promociones',
    pathMatch: 'full',
  },
] satisfies Route[];
