import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FruitsOrderingOrder } from 'src/app/core/models/order.fruits-ordering.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const ORDER_DATA: FruitsOrderingOrder[] = [
  {
    __typename: 'FruitsOrderingOrder',
    id: '5033350d-65c9-4158-8e4d-cb33ac743550',
    orderStatus: 'DONE',
    totalAmount: 12000.0,
    payment: {
      __typename: 'FruitsOrderingPayment',
      id: '02e01f6d-b846-4dfa-b31a-f0c97117adf0',
      orderId: '5033350d-65c9-4158-8e4d-cb33ac743550',
      totalAmount: 12000.0,
      purchaseAt: new Date('2024-08-03T16:27:23.326494Z'),
    },
    products: [
      {
        __typename: 'FruitsOrderingProduct',
        id: '065f86b8-9abf-4d77-9b41-40537e219fda',
        name: 'Apple',
        price: 10000.0,
      },
      {
        __typename: 'FruitsOrderingProduct',
        id: '6b0dce3e-e9d8-4375-adf5-13669d3ae27e',
        name: 'Lemon',
        price: 2000.0,
      },
    ],
  },
];

@Component({
  selector: 'app-fruits-ordering-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './fruits-ordering-orders.component.html',
})
export class FruitsOrderingOrdersComponent {
  displayedColumns: string[] = ['id', 'orderStatus', 'totalAmount', 'action'];
  dataSource = ORDER_DATA;
}
