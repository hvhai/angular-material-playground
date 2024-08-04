import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { FruitsOrderingOrder } from '../../models';
import { FruitsOrderingServiceApi } from '../fruits-ordering.service.api';
import * as FruitsOrderingModulithServiceDto from './fruits-ordering.modulith-service.dto';

@Injectable({
  providedIn: 'root',
})
export class FruitsOrderingModulithService extends FruitsOrderingServiceApi {
  override getAllOrders(): Observable<FruitsOrderingOrder[]> {
    return this.httpClient
      .get<
        FruitsOrderingModulithServiceDto.ApiResponse<
          FruitsOrderingModulithServiceDto.FruitsOrderingOrderDto[]
        >
      >(`${env.api.fruitsOrderingApiUrl}/orders`)
      .pipe(
        map((e) => {
          return FruitsOrderingModulithServiceDto.toFruitsOrderingOrderList(
            e.data
          );
        })
      );
  }

  override purchasePayment(paymentId: string): Observable<boolean> {
    return this.httpClient
      .post(
        `${env.api.fruitsOrderingApiUrl}/payments/${paymentId}/purchase`,
        null
      )
      .pipe(
        map((res) => true),
        catchError(async (err) => false)
      );
  }

  constructor(private httpClient: HttpClient) {
    super();
  }
}
