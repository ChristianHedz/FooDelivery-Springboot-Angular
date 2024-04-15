import { Component } from '@angular/core';
import { ProductDetailComponent } from "../product-detail/product-detail.component";

@Component({
    selector: 'app-products-list',
    standalone: true,
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    imports: [ProductDetailComponent]
})
export class ProductsListComponent {

}
