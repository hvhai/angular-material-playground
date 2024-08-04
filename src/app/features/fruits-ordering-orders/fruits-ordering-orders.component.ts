import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Observable, switchMap } from 'rxjs';
import { FruitsOrderingOrder } from 'src/app/core/models';
import { FruitsOrderingServiceApi } from 'src/app/core/services';
import { FruitsOrderingModulithService } from 'src/app/core/services/adapter';

@Component({
  selector: 'app-fruits-ordering-orders',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
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
    console.log('order :', order);
    this.dataSource$ = this.fruiteOrderingService
      .purchasePayment(order.payment.id)
      .pipe(switchMap((result) => this.fruiteOrderingService.getAllOrders()));
  }

  constructor(private fruiteOrderingService: FruitsOrderingServiceApi) {
    this.dataSource$ = this.fruiteOrderingService.getAllOrders();
  }
}
