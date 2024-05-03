
export interface ICategoryReq {
  id: CatId;
  name: CatName;
}

export type CatName = 'Hamburguesas' | 'Bebidas' | 'Snacks' | 'Otros';
export type CatId = 1 | 2 | 3 | 4;
