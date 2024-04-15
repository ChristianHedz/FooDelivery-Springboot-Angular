import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IFormProduct, IProductDTO} from "../../admin-dashboard/interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private http = inject(HttpClient);
  private url = environments.baseUrl;
  private authService = inject(AuthService);

  createProductByAdmin( product: IProductDTO ): Observable<any> {
    return this.http.post<any>(`${this.url}/products`, product, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  updateProductByAdmin(product: IProductDTO ): Observable<any> {
    // const { id, ...body } = product;

    return this.http.put<any>(`${this.url}/products/${ product.id }`, product, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  deleteProductByAdmin(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/products/${productId}`, { headers: this.authService.addTokenToHeaders() });
  }

  getProductByAdmin(userId: number): Observable<IProductDTO> {
    return this.http.get<IProductDTO>(`${this.url}/products/${ userId }`, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  getAllProducts(): Observable<IProductDTO[]> {
    return this.http.get<any>(`${this.url}/products`, { headers: this.authService.addTokenToHeaders() });
  }

}
