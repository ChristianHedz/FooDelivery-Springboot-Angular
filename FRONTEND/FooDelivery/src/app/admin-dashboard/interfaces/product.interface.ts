import {FormControl} from "@angular/forms";
import {ICategoryReq} from "./category.interface";
import {IPromDto} from "./promotion.interface";

export interface IProductDTO {
  id?: number,
  name: string,
  img: string,
  description: string,
  price: number,
  category?: ICategoryReq
}

export interface IProductWithPromoDTO {
  id: number,
  name: string,
  img: string,
  description: string,
  price: number,
  promotion: IPromDto
}

export interface IFormProduct {
  id?: FormControl<number>;
  name: FormControl<string>;
  img: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
}

export interface IProduct {
  id: number,
  name: string,
  img: string,
  description: string,
  price: number,
}
