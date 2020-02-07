import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffertDetialPageRoutingModule } from './offert-detial-routing.module';

import { OffertDetialPage } from './offert-detial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffertDetialPageRoutingModule
  ],
  declarations: [OffertDetialPage]
})
export class OffertDetialPageModule {}
