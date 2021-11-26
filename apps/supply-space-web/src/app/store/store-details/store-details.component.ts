import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../store.service';

@Component({
  selector: 'supply-space-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {
  storeId;
  storeObs:Observable<any>;
  constructor(private route:ActivatedRoute,private ss:StoreService) { }

  ngOnInit(): void {
      this.storeId = this.route.snapshot.params['id'];
      this.storeObs = this.ss.getStoreInfo(this.storeId)
  }

}
