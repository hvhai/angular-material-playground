import { Observable } from 'rxjs';
import { FruitsOrderingOrder, FruitsOrderingProduct } from '../models';

export abstract class FruitsOrderingServiceApi {
  abstract getAllOrders(): Observable<FruitsOrderingOrder[]>;
  abstract purchasePayment(paymentId: string): Observable<boolean>;
  abstract getAllProducts(): Observable<FruitsOrderingProduct[]>;
  abstract createOrder(productIds: string[]): Observable<FruitsOrderingOrder>;
}
