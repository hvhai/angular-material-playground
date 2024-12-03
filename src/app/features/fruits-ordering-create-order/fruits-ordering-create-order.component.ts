import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FruitsOrderingProduct } from 'src/app/core/models';
import { FruitsOrderingServiceApi } from 'src/app/core/services';
import { FruitsOrderingModulithService } from 'src/app/core/services/adapter';
import { duplicateValueValidator } from 'src/app/shared/directives/duplicate-value.directive';

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
    MatTableModule,
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
  displayedColumns: string[] = ['position', 'name', 'price', 'quantity'];
  productDataSource$: Observable<FruitsOrderingProduct[]>;
  addOrderForm = this.formBuilder.group({
    products: this.formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1), duplicateValueValidator()]
    ),
  });
  router = inject(Router);

  get products() {
    return this.addOrderForm.get('products') as FormArray;
  }

  addProduct() {
    this.products.push(this.formBuilder.control(''));
    this.changeDetectorRef.detectChanges();
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
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
    private formBuilder: FormBuilder,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    this.productDataSource$ = this.fruitsOrderingService.getAllProducts();
  }
}
