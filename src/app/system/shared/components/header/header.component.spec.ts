import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatIconModule} from '@angular/material';
import {EmployeesService} from '../../services/employees.service';
import {MockEmployeesService} from '../../services/employees.service.mock';
import {MockSkillsService} from '../../services/skills.service.mock';
import {SkillsService} from '../../services/skills.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ MatIconModule ],
      providers: [
        {provide: EmployeesService, useClass: MockEmployeesService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
