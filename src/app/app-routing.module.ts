import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./places/places.module").then(m => m.PlacesPageModule)
  },
  {
    path: "places",
    loadChildren: () =>
      import("./places/places.module").then(m => m.PlacesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: "booking",
    loadChildren: () =>
      import("./booking/booking.module").then(m => m.BookingPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
