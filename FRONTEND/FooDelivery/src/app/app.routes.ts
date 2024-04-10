import { Routes } from '@angular/router';
import { MainContentComponent } from './home/main-content/main-content.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [

    {path: "home", component: MainContentComponent},
    {path: "login", component: LoginComponent},
    {path:"profile", component:ProfileComponent},
    {path: "register", component: RegisterComponent},
    {path: "products", component: ProductsListComponent},
    {
      path:"admin",
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./admin-dashboard/pages/dashboard/admin-dashboard.component'),
          loadChildren: () => import('./admin-dashboard/admin.routes'),
          // canActivate: [authGuard],
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        }
      ],
    },
    {path: "**", redirectTo: "home"}



];
