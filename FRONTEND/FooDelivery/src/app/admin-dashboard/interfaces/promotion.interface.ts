import {FormControl} from "@angular/forms";
import {IProduct} from "./product.interface";

export interface IPromReq {
  id?: number,
  description: string,
  code: string,
  percentage: number
}

export interface IPromDto {
  id: number,
  description: string,
  code: string,
  percentage: number,
  active?: boolean
}

export interface IFormProm {
  id?: FormControl<number>;
  description: FormControl<string>;
  code: FormControl<string>;
  percentage: FormControl<number>;
}

export interface IPromoWithProducts {
  isError:     boolean;
  id:          number;
  description: string;
  code:        string;
  percentage:  number;
  active:      boolean;
  products:    IProduct[];
}
