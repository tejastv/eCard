import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestcComponent as ClientscComponent } from './testc/testc.component';


const routes: Routes = [
{
  path: '',
  redirectTo: 'vCard',
  pathMatch: 'full'
},
{
  path: 'vCard',
  component: ClientscComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
