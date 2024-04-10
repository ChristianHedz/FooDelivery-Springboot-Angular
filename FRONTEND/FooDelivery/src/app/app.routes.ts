import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [

    {path: "home", component: MainContentComponent},
    {path: "login", component: LoginComponent},
    {path:"profile", component:ProfileComponent},
    {path: "register", component: RegisterComponent},
    {path: "products", component: ProductsListComponent},

    {path: "**", redirectTo: "home", pathMatch: 'full'}



];
