export interface FruitsOrderingOrder {
  readonly __typename: 'FruitsOrderingOrder';
  id: string;
  orderStatus: string;
  totalAmount: number;
  payment: FruitsOrderingPayment;
  products: FruitsOrderingProduct[];
}
export function instanceOfFruitsOrderingOrder(
  object: any
): object is FruitsOrderingOrder {
  return object.__typename === 'FruitsOrderingOrder';
}

export interface FruitsOrderingPayment {
  readonly __typename: 'FruitsOrderingPayment';
  id: string;
  orderId: string;
  totalAmount: number;
  purchaseAt: Date;
}
export function instanceOfFruitsOrderingPayment(
  object: any
): object is FruitsOrderingPayment {
  return object.__typename === 'FruitsOrderingPayment';
}

export interface FruitsOrderingProduct {
  readonly __typename: 'FruitsOrderingProduct';
  id: string;
  name: string;
  price: number;
  quantity?: number;
}
export function instanceOfFruitsOrderingProduct(
  object: any
): object is FruitsOrderingProduct {
  return object.__typename === 'FruitsOrderingProduct';
}
