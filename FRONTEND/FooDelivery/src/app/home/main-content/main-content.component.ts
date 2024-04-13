import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NavComponent } from '../nav/nav.component';


@Component({
    selector: 'app-main-content',
    standalone: true,
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css'],
    imports: [HeaderComponent, FooterComponent, NavComponent]
})

export class MainContentComponent {

}