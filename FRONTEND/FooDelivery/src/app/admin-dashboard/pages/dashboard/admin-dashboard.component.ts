import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/header/header.component';
import { FooterComponent } from '../../../home/footer/footer.component';
import { NavAdminComponent } from '../../../nav-admin/nav-admin.component';
import {RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NavAdminComponent, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export default class AdminDashboardComponent {

}
