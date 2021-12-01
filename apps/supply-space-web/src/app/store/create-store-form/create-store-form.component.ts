import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ss: StoreService
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

    this.storeForm?.patchValue(this.storeInfo);
    this.autoSave();
  }

  autoSave() {
    this.interval = setInterval(() => {
      console.log(this.storeForm.valid, this.periodicSave);
      if (this.periodicSave === 'ENABLED' && this.storeForm.valid)
        this.saveStore();
    }, 2000);
  }
  saveStore() {
    const store = this.storeForm.value;
    store.id = this.storeId;
    this.ss.addStore(store);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
