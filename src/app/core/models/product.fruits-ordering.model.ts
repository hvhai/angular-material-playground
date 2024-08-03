export interface FruitsOrderingProduct {
  readonly __typename: 'FruitsOrderingProduct';
  id: string;
  name: string;
  price: number;
}
export function instanceOfFruitsOrderingProduct(
  object: any
): object is FruitsOrderingProduct {
  return object.__typename === 'FruitsOrderingProduct';
}
