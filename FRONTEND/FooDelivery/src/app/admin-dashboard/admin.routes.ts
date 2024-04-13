import { Route } from '@angular/router';

export default [
  {
    path: 'productos',
    title: 'pi-truck',
    loadComponent: () => import('./pages/productos/productos.component'),
  },
  {
    path: 'promociones',
    title: 'pi-gift',
    loadComponent: () => import('./pages/promociones/promociones.component'),
  },
  {
    path: 'usuarios',
    title: 'pi-user',
    loadComponent: () => import('./pages/usuarios/pages/users-grid/users-grid.component'),
  },
  {
    path: 'usuario/agregar',
    loadComponent: () => import('./pages/usuarios/pages/add-or-edit-user/add-or-edit-user.component'),
    pathMatch: 'full',
  },
  {
    path: 'usuario/:id/editar',
    loadComponent: () => import('./pages/usuarios/pages/add-or-edit-user/add-or-edit-user.component'),
  },
  {
    path: 'usuario/:id',
    loadComponent: () => import('./pages/usuarios/pages/user-detail/user-detail.component'),
  },
  {
    path: 'ordenes',
    title: 'pi-shopping-cart',
    loadComponent: () => import('./pages/ordenes/ordenes.component'),
  },
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full',
  },
] satisfies Route[];
