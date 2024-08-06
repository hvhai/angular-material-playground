import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FruitsOrderingProduct } from 'src/app/core/models';
import { FruitsOrderingServiceApi } from 'src/app/core/services';
import { FruitsOrderingModulithService } from 'src/app/core/services/adapter';

@Component({
  selector: 'app-fruits-ordering-create-order',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './fruits-ordering-create-order.component.html',
  providers: [
    {
      provide: FruitsOrderingServiceApi,
      useClass: FruitsOrderingModulithService,
    },
  ],
})
export class FruitsOrderingCreateOrderComponent implements OnInit {
  productDataSource$: Observable<FruitsOrderingProduct[]>;
  addOrderForm = this.formBuilder.group({
    products: this.formBuilder.array([this.formBuilder.control('')]),
  });
  router = inject(Router);

  get products() {
    return this.addOrderForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(this.formBuilder.control(''));
  }

  ngOnInit(): void {
    // Create an empty form group
  }

  createOrder() {
    console.log('create order');
    console.warn(this.addOrderForm.value.products);
    let productIds = this.addOrderForm.value.products as string[];
    this.fruitsOrderingService.createOrder(productIds).subscribe({
      complete: () => this.router.navigateByUrl('/fruits-ordering'),
    });
  }

  constructor(
    private fruitsOrderingService: FruitsOrderingServiceApi,
    private formBuilder: FormBuilder
  ) {
    this.productDataSource$ = this.fruitsOrderingService.getAllProducts();
  }
}
