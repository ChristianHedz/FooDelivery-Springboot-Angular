import { Route } from '@angular/router';

export default [
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos.component'),
    // providers: [LotteryService],
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('./pages/pedidos/pedidos.component'),
  },
  {
    path: 'promociones',
    loadComponent: () =>
      import('./pages/promociones/promociones.component'),
  },
  {
    path: 'ordenes',
    loadComponent: () => import('./pages/ordenes/ordenes.component'),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.component'),
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
] satisfies Route[];
