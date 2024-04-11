import { Route } from '@angular/router';

export default [
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.component'),
  },
  {
    path: 'ordenes',
    loadComponent: () => import('./pages/ordenes/ordenes.component'),
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos.component'),
    // providers: [LotteryService],
  },
  {
    path: 'promociones',
    loadComponent: () =>
      import('./pages/promociones/promociones.component'),
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
] satisfies Route[];
