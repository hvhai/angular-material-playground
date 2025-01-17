import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FruitsOrderingOrder } from 'src/app/core/models';
import { FruitsOrderingServiceApi } from 'src/app/core/services';
import { FruitsOrderingModulithService } from 'src/app/core/services/adapter';

@Component({
  selector: 'app-fruits-ordering-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './fruits-ordering-orders.component.html',
  providers: [
    {
      provide: FruitsOrderingServiceApi,
      useClass: FruitsOrderingModulithService,
    },
  ],
})
export class FruitsOrderingOrdersComponent {
  displayedColumns: string[] = ['id', 'orderStatus', 'totalAmount', 'action'];
  dataSource$: Observable<FruitsOrderingOrder[]>;

  purchaseOrder(order: FruitsOrderingOrder): void {
    this.dataSource$ = this.fruiteOrderingService
      .purchasePayment(order.payment.id)
      .pipe(switchMap((result) => this.fruiteOrderingService.getAllOrders()));
  }

  isPurchasable(order: FruitsOrderingOrder): boolean {
    return (
      order.orderStatus != 'DONE' &&
      order.orderStatus != 'CANCELED' &&
      order.orderStatus != 'IN_PRODUCT_PREPARE'
    );
  }

  constructor(private fruiteOrderingService: FruitsOrderingServiceApi) {
    this.dataSource$ = this.fruiteOrderingService.getAllOrders();
  }
}
