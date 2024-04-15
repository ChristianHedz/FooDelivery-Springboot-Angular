
export interface ICategoryReq {
  id: CatId;
  name: CatName;
}

export type CatName = 'Hamburguesas' | 'Bebidas' | 'Snacks' | 'Juguetes';
export type CatId = 2 | 3 | 4 | 5;
