import { Component } from '@angular/core';
import {TitleComponent} from "../../../shared/title/title.component";

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
  user: string = 'Admin';

}
