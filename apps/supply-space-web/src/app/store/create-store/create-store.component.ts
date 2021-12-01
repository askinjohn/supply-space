import { Component, OnInit } from '@angular/core';
import { IProduct, IStore } from '../../interfaces/interface';
import { FormGroup } from '@angular/forms';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { generateNanoid } from '@supply-space/dataservice';
import { Observable } from 'rxjs';

@Component({
  selector: 'supply-space-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit {
  addProduct: boolean = false;
  storeForm: FormGroup;
  products: IProduct[] = [];
  storeId: string;
  interval: NodeJS.Timeout;
  storeSubs: any;
  periodicSave: string;
  storeDetails: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private ss: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.params['id'];
    this.storeDetails = this.ss.getStoreInfo(this.storeId).pipe(
      map((store: IStore) => {
        this.products.push(...store.products);
        return store;
      })
    );
  }

  openDialog() {
    const productId = generateNanoid();
    this.router.navigate([`new-store/${this.storeId}/${productId}`]);
  }
}
