import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'supply-space-create-store-form',
  templateUrl: './create-store-form.component.html',
  styleUrls: ['./create-store-form.component.scss'],
})
export class CreateStoreFormComponent implements OnInit {
  @Input() storeInfo;
  storeId: any;
  storeForm: any;
  interval: NodeJS.Timeout;
  periodicSave = 'ENABLED';
  userId: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ss: StoreService,
    private as: AuthService
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
    this.userId = this.as.user;
    console.log(this.storeInfo)
    this.storeForm?.patchValue(this.storeInfo);
    this.autoSave();
  }

  autoSave() {
    this.interval = setInterval(() => {
      if (this.periodicSave === 'ENABLED' && this.storeForm.valid) {
        const store = this.storeForm.value;
        store.id = this.storeId;
        if (!this.storeInfo.createdAt) this.saveStore(store);
        this.updateStore(store);
      }
    }, 4000);
  }

  updateStore(store) {
    store.updatedAt = Date.now();
    store.updatedBy = this.userId;
    this.ss.addStore(store);
  }

  saveStore(store) {
    store.createdAt = Date.now();
    store.createdBy = this.userId;
    this.ss.addStore(store);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
