import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProfileComponent } from './profile/profile.component';
import {authGuardAdmin} from "./core/guards/authGuardAdmin";
import {notAuthGuard} from "./core/guards/not-auth.guard";
import { ContactComponent } from './shared/contact/contact.component';
import { PurchaseSuccessComponent } from './payments/components/purchase-success/purchase-success.component';
import {authGuardAnyUser} from "./core/guards/authGuardAnyUser";
import {SettingsPageComponent} from "./settings/pages/settings-page/settings-page.component";

export const routes: Routes = [

    {path: "home", component: MainContentComponent},
    {path: "login", component: LoginComponent, canActivate: [notAuthGuard] },
    {path:"profile", component:ProfileComponent, canActivate: [authGuardAnyUser] },
    {path:"settings", component:SettingsPageComponent, canActivate: [authGuardAnyUser] },
    {path: "register", component: RegisterComponent, canActivate: [notAuthGuard] },
    {path: "products", component: ProductsListComponent},
    {path:"contact", component:ContactComponent},
    {path:"purchase", component:PurchaseSuccessComponent},
    {
      path:"admin",
      canMatch: [authGuardAdmin],
      children: [
        {
          path: 'dashboard',
          loadComponent: () => import('./admin-dashboard/pages/dashboard/admin-dashboard.component'),
          loadChildren: () => import('./admin-dashboard/admin.routes'),
        },
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        }
      ],
    },
    {path: "**", redirectTo: "home", pathMatch: 'full'}


];
