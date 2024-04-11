import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [

    {path: "home", component: MainContentComponent},
    {path: "login", component: LoginComponent},
    {path:"profile", component:ProfileComponent},
    {path: "register", component: RegisterComponent},
    {path: "products", component: ProductsListComponent},
    {path:"admin-dashboard", component: AdminDashboardComponent},
    {path: "**", redirectTo: "home"}


];
