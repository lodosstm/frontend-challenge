import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../shared/services/employees.service";
import {Employee} from "../../shared/models/employee.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Skill} from "../../shared/models/skill.module";
import {SkillsService} from "../shared/services/skills.service";

@Component({
  selector: 'task-watch-card',
  templateUrl: './watch-card.component.html',
  styleUrls: ['./watch-card.component.less']
})
export class WatchCardComponent implements OnInit {

  id: number;
  employeee: Employee;
  skills=[];

  constructor(private employeeService: EmployeesService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private skillsService: SkillsService) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));
      this.employeeService.getEmployeeById(this.id).subscribe((empl: Employee)=>{
        this.employeee=empl;
        this.FindSkills(this.employeee);
      });
    });
    this.employeee=this.employeeService.giveEmployee();
  }

  FindSkills(employeee){
    this.skills.length = 0;
    if (employeee.idskill.length != 0) {
      for (let i in employeee.idskill) {
        this.skillsService.getSkill(employeee.idskill[i]).subscribe((skill: Skill) => {
          if (skill) {
            this.skills.push(skill.skillName);
          }
        });
      }
    }
  }

  onClick(){
    this.employeeService.ChangeFlag();
    this.router.navigate(['/system']);
  }

  DeleteEmployee(){
    this.employeeService.deleteEmployee(this.id).subscribe((employee: Employee)=>{});
    this.employeeService.ChangeFlag();
    this.router.navigate(['/system']);
  }
}
