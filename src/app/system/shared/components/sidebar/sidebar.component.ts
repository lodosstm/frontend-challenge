import {Component, OnDestroy, OnInit} from '@angular/core';

import {EmployeesService} from "../../services/employees.service";
import {Employee} from "../../../../shared/models/employee.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {SkillsService} from "../../services/skills.service";
import {Skill} from "../../../../shared/models/skill.module";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'task-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employee: Employee;

  constructor(
    private employeesService: EmployeesService,
    private skillsService: SkillsService
  ) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.employeesService.getEmployees()
    ).subscribe((data: [Employee])=>{
        this.employee = data[0];
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  findSkill(idskill){
    this.skillsService.getSkill(idskill).subscribe((skill: Skill)=> {
      if(skill){
        return skill;
      }
    });
  }
}
