import {
  FruitsOrderingOrder,
  FruitsOrderingPayment,
  FruitsOrderingProduct,
} from '../../models';

type OneOrMany<T> = T | T[];

export interface ApiResponse<OneOrMany> {
  data: OneOrMany;
  errors: [];
  meta: MetaDataModel;
}

export interface MetaDataModel {}

export interface FruitsOrderingOrderDto {
  id: string;
  orderStatus: string;
  totalAmount: number;
  payment: FruitsOrderingPaymentDto;
  products: FruitsOrderingProductDto[];
}

export interface FruitsOrderingPaymentDto {
  id: string;
  orderId: string;
  totalAmount: number;
  purchaseAt: Date;
}

export interface FruitsOrderingProductDto {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function toFruitsOrderingPayment(
  apiPayment: FruitsOrderingPaymentDto
): FruitsOrderingPayment {
  return {
    __typename: 'FruitsOrderingPayment',
    id: apiPayment.id,
    orderId: apiPayment.orderId,
    totalAmount: apiPayment.totalAmount,
    purchaseAt: apiPayment.purchaseAt,
  };
}

export function toFruitsOrderingProduct(
  apiProduct: FruitsOrderingProductDto
): FruitsOrderingProduct {
  return {
    __typename: 'FruitsOrderingProduct',
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    quantity: apiProduct.quantity,
  };
}
export function toFruitsOrderingProductList(
  apiProductList: FruitsOrderingProductDto[]
): FruitsOrderingProduct[] {
  const products: FruitsOrderingProduct[] = [];
  apiProductList.forEach((element) => {
    const product = toFruitsOrderingProduct(element);
    products.push(product);
  });
  return products;
}

export function toFruitsOrderingOrder(
  apiOrder: FruitsOrderingOrderDto
): FruitsOrderingOrder {
  return {
    __typename: 'FruitsOrderingOrder',
    id: apiOrder.id,
    orderStatus: apiOrder.orderStatus,
    totalAmount: apiOrder.totalAmount,
    payment: toFruitsOrderingPayment(apiOrder.payment),
    products: toFruitsOrderingProductList(apiOrder.products),
  };
}

export function toFruitsOrderingOrderList(
  apiOrderList: FruitsOrderingOrderDto[]
): FruitsOrderingOrder[] {
  const orders: FruitsOrderingOrder[] = [];
  apiOrderList.forEach((element) => {
    const order = toFruitsOrderingOrder(element);
    orders.push(order);
  });
  return orders;
}
