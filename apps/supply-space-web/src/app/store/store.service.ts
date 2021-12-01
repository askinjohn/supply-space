import { Injectable } from '@angular/core';
import {
  DatastoreService,
  generateNanoid,
  objectValuesAsArray,
} from '@supply-space/dataservice';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { IProduct, IStore } from '../interfaces/interface';

@Injectable()
export class StoreService {
  constructor(private ds: DatastoreService) {}
  addStore(store) {
    const res = this.ds.updateObjectValuesByKey(`stores/${store.id}`, store);
  }

  getAllStores() {
    return this.ds
      .getListByKey(`stores`)
      .pipe(
        map((stores: IStore[]) =>
          stores.filter((store: IStore) => !store.archived)
        )
      );
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
