import {Component, computed, inject, signal} from '@angular/core';
import { HeaderComponent } from '../../../home/header/header.component';
import { FooterComponent } from '../../../home/footer/footer.component';
import { NavAdminComponent } from '../../../nav-admin/nav-admin.component';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {HeaderAdminComponent} from "../../components/header/header-admin.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NavAdminComponent, RouterOutlet, SidebarComponent, HeaderAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export default class AdminDashboardComponent {
}
