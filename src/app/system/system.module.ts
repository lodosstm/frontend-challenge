import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule
} from '@angular/material';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import { AddCardComponent } from './add-card/add-card.component';
import { WatchCardComponent } from './watch-card/watch-card.component';
import {SystemComponent} from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {EmployeesService} from './shared/services/employees.service';
import {SkillsService} from './shared/services/skills.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AddCardComponent, WatchCardComponent, SystemComponent, SidebarComponent, HeaderComponent],
  providers: [EmployeesService, SkillsService],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})

export class SystemModule {}
