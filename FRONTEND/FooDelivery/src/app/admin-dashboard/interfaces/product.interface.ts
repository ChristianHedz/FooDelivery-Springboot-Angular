import {ICategoryReq} from "./category.interface";

export interface IProductReq {
  "id": number,
  "name": string,
  "img": string,
  "description": string,
  "price": number,
  "category"?: ICategoryReq
}
