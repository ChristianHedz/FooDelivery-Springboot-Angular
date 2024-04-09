import { Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { FooterComponent } from '../home/footer/footer.component';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,NavAdminComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
