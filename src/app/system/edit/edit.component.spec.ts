import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule,
  MatOptionModule, MatProgressBarModule,
  MatSelectModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeesService} from '../shared/services/employees.service';
import {MockEmployeesService} from '../shared/services/employees.service.mock';
import {SkillsService} from '../shared/services/skills.service';
import {MockSkillsService} from '../shared/services/skills.service.mock';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
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
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
