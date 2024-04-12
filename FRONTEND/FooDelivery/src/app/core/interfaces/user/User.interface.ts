import {FormControl} from "@angular/forms";

export interface IUser {
  isError?:  boolean;
  id:       number;
  fullName: string;
  phone:    string;
  email:    string;
  alias?:    string;
  role?:     string;
  active?:   boolean;
}

export interface UserDTO {
  id?:       number;
  fullName: string;
  phone:    string;
  email:    string;
  alias?:    string;
  role?:     string;
  password?: string;
  active?:   boolean;
}

export interface IFormUser {
  id?: FormControl<number>;
  fullName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  alias?: FormControl<string>;
  role?: FormControl<string>;
  password: FormControl<string>;
  active?: FormControl<boolean>;
}

export interface IUsers {
  content:          IUser[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
