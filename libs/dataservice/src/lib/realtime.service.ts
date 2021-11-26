import { Injectable, Optional, SkipSelf } from '@angular/core';
import {
    AngularFireDatabase,
    QueryFn,
    SnapshotAction,
} from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { DatastoreService } from './datastore.service';

@Injectable()
export class FirebaseRealtimeService implements DatastoreService {
    constructor(private af: AngularFireDatabase) {}

    getListByKey(url: string, queryFn?: QueryFn): Observable<any[]> {
        return this.af
            .list(url, queryFn)
            .snapshotChanges()
            .pipe(
                map((val) => {
                    return val.map((action: SnapshotAction<any>) => {
                        const $key = action.payload.key;
                        const data = { $key, ...action.payload.val() };
                        return data;
                    });
                }),
                catchError((error) => {
                    if (error.code === 'PERMISSION_DENIED') return of([]);
                    throw error;
                }),
                shareReplay<any[]>()
            );
    }

    addItemToList(url: string, item: any): any {
        return this.af.list(url).push(item).key;
    }

    getObjectByKey(url: string): Observable<any> {
        return this.af
            .object(url)
            .snapshotChanges()
            .pipe(
                map((action: SnapshotAction<any>) => {
                    const $key = action.payload.key;
                    const data = { $key, ...action.payload.val() };
                    return data;
                }),
                catchError((error) => {
                    if (error.code === 'PERMISSION_DENIED') return of(null);
                    throw error;
                }),
                shareReplay()
            );
    }

    updateObjectByKey(url: string, item: any): void {
        this.af.object(url).set(item);
    }

    updateObjectValuesByKey(url: string, item: any): Promise<void> {
        return this.af.object(url).update(item);
    }

    removeItemFromList(url: string, itemKey: string) {
        this.af.list(url).remove(itemKey);
    }
}

export function REALTIME_DB_SERVICE_PROVIDER_FACTORY(
    dispatcher: FirebaseRealtimeService,
    ad: AngularFireDatabase
) {
    return dispatcher || new FirebaseRealtimeService(ad);
}

export const REALTIME_DB_SERVICE_PROVIDER = {
    // If there is already an OverlayKeyboardDispatcher available, use that.
    // Otherwise, provide a new one.
    provide: DatastoreService,
    deps: [
        [new Optional(), new SkipSelf(), FirebaseRealtimeService],
        AngularFireDatabase,
    ],
    useFactory: REALTIME_DB_SERVICE_PROVIDER_FACTORY,
};
