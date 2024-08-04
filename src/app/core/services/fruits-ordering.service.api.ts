import { Observable } from 'rxjs';
import { FruitsOrderingOrder } from '../models/fruits-ordering.model';

export abstract class FruitsOrderingServiceApi {
  abstract getAllOrders(): Observable<FruitsOrderingOrder[]>;
}
