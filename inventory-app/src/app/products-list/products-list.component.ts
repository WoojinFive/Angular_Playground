import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product.model';

//  @ProductsList: a component Rendering all ProductRows and saving selected Product
@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
})

export class ProductsListComponent {
  // @input productList - product[] from parent
  @Input() productList: Product[];

  // @output onProductSelected - output current Product every time selecting new Product
  @Output() onProductSelected: EventEmitter<Product>;

  // local state containing currently selected Product
  private currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }
}
