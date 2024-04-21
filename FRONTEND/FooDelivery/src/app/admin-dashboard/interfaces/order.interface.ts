import {UserWithAdress} from "./user.interface";
import {IProductWithPromoDTO} from "./product.interface";
import {IPromDto} from "./promotion.interface";

export interface IOrderReq {
  id: number,
  productId: number,
  userId: number,
  quantity: number,
  price: number,
  status: string,
  createdAt: string,
  updatedAt: string
}

export interface OrderResponse {
  id:            number;
  totalPrice:    number;
  status:        string;
  paymentMethod: string;
  createdAt:     number;
  updatedAt:     null;
  user:          UserWithAdress;
  promotion?:     IPromDto;
  products:      IProductWithPromoDTO[];
}

export interface OrderResponseAll {
  content:          OrderResponse[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  sorted:   boolean;
  empty:    boolean;
  unsorted: boolean;
}

export enum StatusOrder {
  IN_PROGRESS = 'En progreso',
  ON_ROUTE = 'En camino',
  DELIVERED = 'Entregado',
  CANCELED = 'Cancelado'
}
