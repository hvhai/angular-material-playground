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
