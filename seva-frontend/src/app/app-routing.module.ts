import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGaurd, reverseAuthGaurd } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [reverseAuthGaurd],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: '',
    canActivate: [authGaurd],
    loadChildren: () => import('./modules/home.module').then( m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
