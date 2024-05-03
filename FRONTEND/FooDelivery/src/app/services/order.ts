
export interface Order {
    id?: number;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    status: StatusOrder;
    createdAt: Date;
    user: {
      id: number;
    };
    products: {
      id: number;
      count?: number;
    }[];
    promotion?: {
      id: number;
    };
  }

  export enum StatusOrder {
    IN_PROGRESS,
    ON_ROUTE,
    DELIVERED,
    CANCELED
  }

  export enum PaymentMethod {
    PAYPAL,
    CASH
  }
