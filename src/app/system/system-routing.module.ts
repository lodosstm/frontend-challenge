import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {AddCardComponent} from './add-card/add-card.component';
import {WatchComponent} from './watch/watch.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
    {path: 'watch/:id', component: WatchComponent},
    {path: 'add', component: AddCardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
