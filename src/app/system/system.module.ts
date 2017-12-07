import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule
} from '@angular/material';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import { AddCardComponent } from './add-card/add-card.component';
import {SystemComponent} from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {EmployeesService} from './shared/services/employees.service';
import {SkillsService} from './shared/services/skills.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WatchComponent } from './watch/watch.component';

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
  declarations: [AddCardComponent, SystemComponent, SidebarComponent, HeaderComponent, WatchComponent],
  providers: [EmployeesService, SkillsService],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})

export class SystemModule {}
