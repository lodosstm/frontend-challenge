import {Component, OnInit, Input} from '@angular/core';

import {EmployeesService} from '../../services/employees.service';
import {Employee} from '../../../../shared/models/employee.model';
import {SkillsService} from '../../services/skills.service';
import {Skill} from '../../../../shared/models/skill.module';
import {Router} from '@angular/router';

@Component({
  selector: 'task-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})

export class SidebarComponent implements OnInit {

  @Input() item: Employee;
  skills = [];

  constructor(
    private employeesService: EmployeesService,
    private skillsService: SkillsService,
    private router: Router
  ) { }

  ngOnInit() {
    let k = 0;
    for (const j in this.item.idskill) {
      if (this.item.idskill.hasOwnProperty(j)) {
        this.skillsService.getSkill(this.item.idskill[j]).subscribe((skill: Skill) => {
          this.skills[k] = skill.skillName;
          k++;
        });
      }
    }
  }

  onClick(employee) {
    this.employeesService.bringEmployee(employee);
    this.router.navigate(['/system/watch', `${employee.id}`]);
  }
}
