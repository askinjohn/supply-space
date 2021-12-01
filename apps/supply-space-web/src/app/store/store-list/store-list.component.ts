import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generateNanoid } from '@supply-space/dataservice';
import { Observable } from 'rxjs';
import { StoreService } from '../store.service';

@Component({
  selector: 'supply-space-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  storesObs: Observable<any>;

  constructor(private ss: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.storesObs = this.getAllStores();
  }

  getAllStores(): Observable<any> {
    return this.ss.getAllStores();
  }

  createNewStore() {
    const uid = generateNanoid();
    this.router.navigate([`new-store/${uid}`]);
  }

  storeDetails(id) {
    this.router.navigate([`new-store/${id}`]);
  }
}
