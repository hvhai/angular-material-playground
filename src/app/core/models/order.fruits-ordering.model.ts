import { FruitsOrderingPayment } from './payment.fruits-ordering.model';
import { FruitsOrderingProduct } from './product.fruits-ordering.model';

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
