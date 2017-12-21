import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchComponent } from './watch.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatOptionModule, MatProgressBarModule,
  MatSelectModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockSkillsService} from '../shared/services/skills.service.mock';
import {EmployeesService} from '../shared/services/employees.service';
import {SkillsService} from '../shared/services/skills.service';
import {MockEmployeesService} from '../shared/services/employees.service.mock';

describe('WatchComponent', () => {
  let component: WatchComponent;
  let fixture: ComponentFixture<WatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchComponent ],
      imports: [
        CommonModule,
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
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: EmployeesService, useClass: MockEmployeesService},
        {provide: SkillsService, useClass: MockSkillsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
