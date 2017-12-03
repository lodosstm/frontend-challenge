import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatToolbarModule
} from '@angular/material';

import {SharedModule} from "../shared/shared.module";
import {SystemRoutingModule} from "./system-routing.module";
import { AddCardComponent } from './add-card/add-card.component';
import { WatchCardComponent } from './watch-card/watch-card.component';
import {SystemComponent} from "./system.component";
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {EmployeesService} from "./shared/services/employees.service";
import {SkillsService} from "./shared/services/skills.service";

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
    MatIconModule
  ],
  declarations: [AddCardComponent, WatchCardComponent, SystemComponent, SidebarComponent, HeaderComponent],
  providers: [EmployeesService, SkillsService]
})

export class SystemModule {}
