import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import adminRoutes from "../../admin.routes";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'sidebar-admin',
  standalone: true,
  imports: [RouterModule, TitleCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // Con este array pintaremos el menú lateral
  public menuItems =  adminRoutes
    .map( route => route ?? []) // Obtener las rutas hijas y si no hay, devolver un array vacío
    .flat() // Aplanar el array ya que el map devuelve un array de arrays
    .filter( route => route && route.path) // Filtrar las rutas que no tengan path: path: ''
    .filter( route => !route.path?.includes(':')) // Filtrar las rutas que tengan parámetros

}
