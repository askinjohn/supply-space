import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import {
  DatastoreService,
  objectValuesAsArray,
} from '@supply-space/dataservice';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { IProduct, IStore } from '../interfaces/interface';

@Injectable()
export class StoreService {
  constructor(private ds: DatastoreService,private aff:AngularFireFunctions) {}

  addStore(store) {
    return this.ds.updateObjectValuesByKey(`stores/${store.id}`, store);
  }


  getAllStores() {
    return this.aff.httpsCallable('getStoresForUser')('')
  }

  getStoreInfo(storeId) {
    return this.ds.getObjectByKey(`stores/${storeId}`).pipe(
      take(1),
      map((store: IStore) => {
        store.products = objectValuesAsArray(store.products).filter(
          (p: IProduct) => p.name
        );
        return store;
      })
    );
  }

  addProduct(storeId, productId, product) {
    return this.ds.updateObjectValuesByKey(
      `stores/${storeId}/products/${productId}`,
      {
        ...product,
      }
    );
  }

  getProductInfo(storeId, productId) {
    return this.ds.getObjectByKey(`stores/${storeId}/products/${productId}`);
  }

}
