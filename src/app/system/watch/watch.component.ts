import { Component, OnInit } from '@angular/core';
import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/isEmpty';
import {SkillsService} from '../shared/services/skills.service';
import {Skill} from '../../shared/models/skill.module';

@Component({
  selector: 'task-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.less']
})
export class WatchComponent implements OnInit {

  id: number;
  employee;
  skills = [];
  step = 30;
  constructor(private employeeService: EmployeesService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private skillService: SkillsService) { }

  ngOnInit() {
    document.getElementById('sidebar').classList.add('sidebar_opened');
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.employeeService.flag = true;
      this.employee = this.employeeService.giveEmployee();
      if (this.employee !== undefined) {
        this.searchSkill();
      }
      if (this.employeeService.open) {
        document.getElementById('sidebar').style.display = 'none';
        this.employeeService.open = false;
      }
    });
    if (this.employee === undefined) {
      this.employeeService.getEmployeeById(this.id).subscribe(data => {
        if (data) {
          this.employee = data;
          this.searchSkill();
          this.employeeService.bringEmployee(this.employee);
        }
      });
    }
    document.getElementById('js-employee').addEventListener('wheel', (event) => {
      const $sidebar = document.getElementById('js-employee');
      if (0 < event.deltaY) {
        if ($sidebar.scrollTop + this.step <= $sidebar.scrollHeight) {
          $sidebar.scrollTop += this.step;
        } else {
          $sidebar.scrollTop = $sidebar.scrollHeight;
        }
      } else {
        if ($sidebar.scrollTop - this.step >= 0) {
          $sidebar.scrollTop -= this.step;
        } else {
          $sidebar.scrollTop = 0;
        }
      }
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.id).subscribe((data: Employee) => {
      this.employeeService.updateEmployees();
      this.employeeService.getEmployeeById(this.id).isEmpty();
      {
        document.getElementById('sidebar').classList.remove('sidebar_opened');
        this.employeeService.flag = false;
        this.router.navigate(['/system']);
      }
    });
  }

  searchSkill() {
    this.skills.length = 0;
    let k = 0;
    for (const j in this.employee.idskill) {
      if (this.employee.idskill.hasOwnProperty(j)) {
        this.skillService.getSkill(this.employee.idskill[j]).subscribe((skill: Skill) => {
          this.skills[k] = skill.skillName;
          k++;
        });
      }
    }
  }

  deleteCard() {
    this.employeeService.flag = false;
    document.getElementById('sidebar').classList.remove('sidebar_opened');
    this.router.navigate(['/system']);
  }

  edit() {
    this.router.navigate(['/system/edit', `${this.employee.id}`]);
  }
}
