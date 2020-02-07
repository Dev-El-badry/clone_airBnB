import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffertDetialPage } from './offert-detial.page';

const routes: Routes = [
  {
    path: '',
    component: OffertDetialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffertDetialPageRoutingModule {}
