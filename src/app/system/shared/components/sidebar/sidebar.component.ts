import {Component, OnDestroy, OnInit} from '@angular/core';

import {EmployeesService} from "../../services/employees.service";
import {Employee} from "../../../../shared/models/employee.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {SkillsService} from "../../services/skills.service";
import {Skill} from "../../../../shared/models/skill.module";
import {Router} from "@angular/router";

@Component({
  selector: 'task-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employee: Employee;
  skills = [];

  constructor(
    private employeesService: EmployeesService,
    private skillsService: SkillsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.employeesService.getEmployees()
    ).subscribe((data: [Employee])=>{
        this.employee = data[0];
        for(let i in this.employee){
          this.skills[i] = [];
          for(let j in this.employee[i].idskill) {
            this.skillsService.getSkill(this.employee[i].idskill[j]).subscribe((skill: Skill) => {
              this.skills[i][j] = skill.skillName;
            });
          }
        }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClick(employee){
    this.employeesService.bringEmployee(employee);
    this.router.navigate(['/system/watch', `${employee.id}`]);
  }
}
