import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'supply-space-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products;
  storeId: any;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.params['id'];
  }

  clickedRow(productId) {
    this.router.navigate([`new-store/${this.storeId}/${productId}`]);
  }
}
