import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderAdminComponent } from "../../components/header/header-admin.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export default class AdminDashboardComponent {
}
