import {FormControl} from "@angular/forms";
import {ICategoryReq} from "./category.interface";

export interface IProductDTO {
  id?: number,
  name: string,
  img: string,
  description: string,
  price: number,
  category?: ICategoryReq,
  count?: number | undefined
}

export interface IFormProduct {
  id?: FormControl<number>;
  name: FormControl<string>;
  img: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
}
