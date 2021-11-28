import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreCardsComponent } from './store-cards/store-cards.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [StoreCardsComponent],
  imports: [CommonModule,MatButtonModule],
  exports: [StoreCardsComponent],
})
export class ComponentModule {}
