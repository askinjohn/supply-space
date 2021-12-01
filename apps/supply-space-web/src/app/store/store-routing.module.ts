import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreListComponent } from './store-list/store-list.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: StoreListComponent,
      },
      {
        path: 'new-store/:id',
        component: CreateStoreComponent,
      },
      {
        path: 'stores/:id',
        component: StoreDetailsComponent,
      },
      {
        path: 'new-store/:storeId/:productId',
        component: AddProductDialogComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
