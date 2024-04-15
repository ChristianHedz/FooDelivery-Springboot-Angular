import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MainContentService } from './services/main-content.service';
import { Observable, of } from 'rxjs';
import { IProductDTO } from '../admin-dashboard/interfaces/product.interface';

@Component({
  selector: 'app-main-content',
  standalone: true,
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  imports: [AsyncPipe],
})
export class MainContentComponent implements OnInit{
  mainService = inject(MainContentService);
  products: IProductDTO[] = [];

  ngOnInit(): void {
    this.mainService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    })
  }
}
