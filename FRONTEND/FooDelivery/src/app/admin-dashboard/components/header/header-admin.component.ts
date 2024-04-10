import {Component, inject} from '@angular/core';
import {TitleComponent} from "../../../shared/title/title.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-admin',
  standalone: true,
  imports: [
    TitleComponent
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  user: string = 'Admin';

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
