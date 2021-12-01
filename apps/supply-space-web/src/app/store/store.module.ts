import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreListComponent } from './store-list/store-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateStoreComponent } from './create-store/create-store.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './store.service';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { MatListModule } from '@angular/material/list';
import { ComponentModule } from '../component /component.module';
import { CreateStoreFormComponent } from './create-store-form/create-store-form.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    StoreListComponent,
    CreateStoreComponent,
    AddProductDialogComponent,
    StoreDetailsComponent,
    CreateStoreFormComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    ComponentModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  providers: [StoreService],
})
export class StoreModule {}
