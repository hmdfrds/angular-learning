import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Board } from './board';

const routes: Routes = [{ path: '', component: Board }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
