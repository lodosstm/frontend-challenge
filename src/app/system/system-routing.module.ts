import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {AddCardComponent} from './add-card/add-card.component';
import {WatchComponent} from './watch/watch.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
    {path: 'watch/:id', component: WatchComponent},
    {path: 'add', component: AddCardComponent},
    {path: 'edit/:id', component: EditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
