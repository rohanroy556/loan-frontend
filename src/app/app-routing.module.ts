import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanComponent, PartnerComponent, PartnersComponent } from './component';

const routes: Routes = [
  { path: '', redirectTo: '/partner', pathMatch: 'full' },
  { path: 'loan', component: LoanComponent },
  { path: 'loan/:partnerId', component: LoanComponent },
  { path: 'partner', component: PartnersComponent },
  { path: 'partner/:id', component: PartnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
