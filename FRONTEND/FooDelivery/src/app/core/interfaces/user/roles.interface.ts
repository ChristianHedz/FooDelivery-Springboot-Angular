export interface Roles {
  name: RoleName;
  code: RoleCode;
}

export type RoleName = 'Administrador' | 'Cliente' | 'Repartidor';
export type RoleCode = 'ADMIN' | 'CUSTOMER' | 'DELIVERY_MAN';
