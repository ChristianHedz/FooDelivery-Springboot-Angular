import {FormControl} from "@angular/forms";

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
  percentage: number
}

export interface IFormProm {
  id?: FormControl<number>;
  description: FormControl<string>;
  code: FormControl<string>;
  percentage: FormControl<number>;
}
