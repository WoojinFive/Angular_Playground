import { Component, Input, HostBinding } from '@angular/core';
import { Product } from '../product.model';

// component displaying one product
@Component({
  selector: 'product-row',
  templateUrl: './product-row.component.html',
})
export class ProductRowComponent {
  @Input() product: Product;
  @HostBinding('attr.class') cssClass = 'item';
  
  constructor() { }

}
