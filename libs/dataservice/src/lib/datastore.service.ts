import { Injectable } from '@angular/core';
import { QueryFn as query2 } from '@angular/fire/compat/database';
import { QueryFn } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable()
export abstract class DatastoreService {
    constructor() {}

    abstract getListByKey(
        key: string,
        query?: QueryFn | query2
    ): Observable<any[]>;
    abstract addItemToList(key: string, item: any): string;
    abstract getObjectByKey(key: string): Observable<any>;
    abstract updateObjectByKey(key: string, item: any): void;
    abstract removeItemFromList(url: string, itemKey: string):any;
    abstract updateObjectValuesByKey(url: string, item: any): Promise<void>;
}
