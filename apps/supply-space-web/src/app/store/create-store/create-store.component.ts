import { Component, OnInit } from '@angular/core';
import { IProduct, IStore } from '../../interfaces/interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { generateNanoid } from '@supply-space/dataservice';

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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ss: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.params['id'];
    this.storeForm = this.fb.group({
      name: ['', Validators.required],
      gstin: ['', Validators.required],
      mobile: ['', Validators.required],
      address: [''],
      contactName: [''],
      email: [''],
    });
    const store = this.ss
      .getStoreInfo(this.storeId)
      .pipe(take(1),map((store: IStore) => {
        this.storeForm.patchValue(store)

        this.products.push(...store.products)
      }));
    if(store){
     this.storeSubs = store.subscribe();
     this.periodicSave = 'ENABLED'
    }
    this.autoSave();
  }
  
clickedRow(productId){
  this.router.navigate([`new-store/${this.storeId}/${productId}`])
}
  autoSave() {
    this.interval = setInterval(() => {
      if(this.periodicSave === 'ENABLED' && this.storeForm.valid)
        this.saveStore();
    }, 2000);
  }

  openDialog() {
    const productId = generateNanoid();
    this.router.navigate([`new-store/${this.storeId}/${productId}`])
  }

  pushProducts(value: IProduct) {
    this.products.push(value);
    this.addProduct = false;
  }

  addStore() {
    this.saveStore();
    this.router.navigate(['']);
  }

  saveStore() {
    const store = this.storeForm.value;
    store.id = this.storeId;
    this.ss.addStore(store);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.storeSubs.unsubscribe();
  }
}
