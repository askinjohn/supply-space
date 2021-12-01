import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generateNanoid } from '@supply-space/dataservice';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { StoreService } from '../store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../interfaces/interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'supply-space-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;
  uploadingImage: string;
  downloadURL: any;
  imageUrls = [];
  storeId: FormGroup;
  productId: any;
  productSubs: any;
  periodicSave: string;
  interval: NodeJS.Timeout;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFireStorage,
    private ss: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeSnap = this.route.snapshot;
    this.storeId = routeSnap.params['storeId'];
    this.productId = routeSnap.params['productId'];
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      price: [''],
      discPrice: [''],
    });
    const product = this.ss.getProductInfo(this.storeId, this.productId).pipe(
      take(1),
      map((product: IProduct) => {
        this.productForm.patchValue(product);
        if (product.images) {
          this.imageUrls.push(...product.images);
        }
      })
    );
    if (product) {
      this.productSubs = product.subscribe();
      this.periodicSave = 'ENABLED';
    }

    this.autoSave();
  }

  close() {
    this.router.navigate([`new-store/${this.storeId}`]);
  }

  autoSave() {
    this.interval = setInterval(() => {
      if (
        this.periodicSave === 'ENABLED' &&
        this.uploadingImage !== 'INITIATED' &&
        this.productForm.valid
      )
        this.saveProduct();
    }, 2000);
  }

  addProduct() {
    this.saveProduct();
    this.close();
  }
  saveProduct() {
    const obj = this.productForm.value;
    obj.id = this.productId;
    if (this.imageUrls.length > 0) {
      obj.images = this.imageUrls;
    }
    this.ss.addProduct(this.storeId, this.productId, obj);
  }

  uploadImage(event) {
    const file = event.target.files[0];

    if (file.size > 2097152) {
      alert('file size is too big');
    }
    this.uploadingImage = 'INITIATED';
    if (event.target.files.length > 0) {
      const uid = generateNanoid();
      const filePath = `applications/${uid}`;
      const fileRef = this.afs.ref(filePath);
      const task = this.afs.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((url) => {
              this.imageUrls.push({ id: uid, url: url });
              this.uploadingImage = 'COMPLETED';
            });
          })
        )
        .subscribe();
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.productSubs.unsubscribe();
  }
}
