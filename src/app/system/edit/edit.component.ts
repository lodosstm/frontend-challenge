import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {SkillsService} from '../shared/services/skills.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Skill} from '../../shared/models/skill.module';

@Component({
  selector: 'task-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {

  myGroup: FormGroup;
  selectable = true;
  removable = true;

  skills = [];
  idskills = [];
  result = [];
  index = -1;
  event: MatChipInputEvent;
  id: number;
  birthDay: string;
  persents = {
    'photo': 20,
    'firstName': 5,
    'lastName': 5,
    'Sex': 5,
    'birthDay': 5,
    'position': 10,
    'idskill': 5,
    'characteristic': 10
  };
  employee: Employee;
  percentsEmployee: number;
  date: Date;

  constructor(private employeeService: EmployeesService,
              private skillsService: SkillsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.employee = this.employeeService.giveEmployee();
    });
    this.employeeService.getEmployeeById(this.id).subscribe((data: Employee) => {
      this.employee = data;
    });
    this.date = this.employee.birthDay !== undefined ? new Date(this.employee.birthDay.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) : null;
    this.myGroup = new FormGroup({
      'firstname': new FormControl(this.employee.firstName !== undefined ? this.employee.firstName : null, []),
      'lastname': new FormControl(this.employee.lastName !== undefined ? this.employee.lastName : null, []),
      'position': new FormControl(this.employee.position !== undefined ? this.employee.position : null, []),
      'sex': new FormControl(this.employee.Sex !== undefined ? this.employee.Sex : null, []),
      'birthday': new FormControl(this.date, []),
      'character': new FormControl(this.employee.characteristic !== undefined ? this.employee.characteristic : null, []),
      'skill': new FormControl(null, [])
    });
    if (this.employee.birthDay !== undefined) {
      this.birthDay = [this.myGroup.value.birthday.getDate(),
        this.myGroup.value.birthday.getMonth() + 1,
        this.myGroup.value.birthday.getFullYear()].join('.');
    }

    this.idskills = this.employee.idskill;
    this.searchSkill();
    this.skillsService.Skills();
    this.calculator();
    this.percentsEmployee = this.employee.progress;

  }

  item1() {
    const el = document.getElementsByClassName('mat-option');
    for (const i in el) {
      if (el.hasOwnProperty(i)) {
        el[i].classList.remove('active-select-two');
      }
    }
  }

  item2() {
    const el = document.getElementsByClassName('mat-option');
    for (const i in el) {
      if (el.hasOwnProperty(i)) {
        el[i].classList.add('active-select-two');
      }
    }
  }

  clickSelect() {
    if (this.employee.Sex === 'Female') {
      const el = document.getElementsByClassName('mat-option');
      for (const i in el) {
        if (el.hasOwnProperty(i)) {
          el[i].classList.add('active-select-two');
        }
      }
    }
  }

  searchSkill() {
    let k = 0;
    for (const j in this.employee.idskill) {
      if (this.employee.idskill.hasOwnProperty(j)) {
        this.skillsService.getSkill(this.employee.idskill[j]).subscribe((skill: Skill) => {
          this.skills[k] = skill.skillName;
          k++;
        });
      }
    }
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.skills.length < 5) {
      this.skills.push(value.trim());
      const index = this.skills.length - 1;
      if (index + 1 !== 0) {
        this.skillsService.getSkillByName(this.skills[index]).subscribe((skill: Skill) => {
          if (skill) {
            this.idskills[index] = skill.id;
          } else {
            const skills = new Skill(this.skills[index]);
            this.skillsService.createNewSkill(skills).subscribe((skillsi: Skill) => {
              if (skillsi === undefined) {
                alert('Error of creating skill!');
              }
            });
            this.skillsService.getSkillByName(this.skills[index]).subscribe((skilli: Skill) => {
              if (skilli) {
                this.idskills[index] = skilli.id;
              }
            });
          }
        });
      }
      this.result.length = 0;
    }
    if (input && this.skills.length <= 5) {
      input.value = '';
    }
  }

  remove(fruit) {
    const index = this.skills.indexOf(fruit);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  InitEmployee() {
      return new Employee('http://dummyimage.com/150',
      this.myGroup.value.firstname,
      this.myGroup.value.lastname,
      this.myGroup.value.sex,
      this.birthDay,
      this.myGroup.value.position,
      this.idskills,
      this.myGroup.value.character,
      this.percentsEmployee);
  }

  onSubmit() {
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee()).subscribe((data: Employee) => {
      if (data) {
        this.employeeService.updateEmployees();
        this.router.navigate(['/system/watch', `${this.id}`]);
      }
    });
  }

  SelectionChange(event) {
    this.myGroup.value.birthday = event.value;
    this.birthDay = [this.myGroup.value.birthday.getDate(),
      this.myGroup.value.birthday.getMonth() + 1,
      this.myGroup.value.birthday.getFullYear()].join('.');
  }

  returnCard() {
    this.router.navigate(['/system/watch', `${this.id}`]);
  }

  itemClick(i) {
    this.skills.push(this.result[i].trim());
    const index = this.skills.length - 1;
    if (index + 1 !== 0) {
      this.skillsService.getSkillByName(this.skills[index]).subscribe((skill: Skill) => {
        if (skill) {
          this.idskills[index] = skill.id;
        } else {
          const skills = new Skill(this.skills[index]);
          this.skillsService.createNewSkill(skills).subscribe((skillsi: Skill) => {
            if (skillsi === undefined) {
              alert('Error of creating skill!');
            }
          });
          this.skillsService.getSkillByName(this.skills[index]).subscribe((skilli: Skill) => {
            if (skilli) {
              this.idskills[index] = skilli.id;
            }
          });
        }
      });
    }
    this.result.length = 0;
    const input = this.event.input;
    this.addItem(input);
  }

  addItem(input) {
    if (input && this.skills.length <= 5) {
      input.value = '';
    }
  }

  search(event) {
    let k = 0;
    this.result.length = 0;
    if (event !== undefined) {
      for (const j in this.skillsService.skills) {
        if (this.skillsService.skills.hasOwnProperty(j)) {
          if (this.skillsService.skills[j].skillName.indexOf(event) === 0
            && event.length <= this.skillsService.skills[j].skillName.length) {
            this.result[k] = this.skillsService.skills[j].skillName;
            k++;
          }
        }
      }
    }
  }

  keydown(event) {
    if (event.key === 'ArrowDown') {
      if (this.result !== null && this.index < this.result.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    } else if (event.key === 'ArrowUp') {
      if (this.index > 0) {
        this.index--;
      } else {
        this.index = this.result.length - 1;
      }
    } else if (event.key === 'Enter') {
      if (this.index === -1) {
        this.add(this.event);
      } else {
        this.itemClick(this.index);
      }
    } else {
      this.index = -1;
    }
  }

  addEvent(event) {
    this.event = event;
  }

  calculator() {
    const employee = this.InitEmployee();
    this.percentsEmployee = 20 + (employee.firstName != null ? this.persents.firstName : 0)
      + (employee.firstName != null ? this.persents.firstName : 0)
      + (employee.lastName != null ? this.persents.lastName : 0)
      + (employee.position != null ? this.persents.position : 0)
      + (employee.characteristic != null ? this.persents.characteristic : 0)
      + (employee.Sex != null ? this.persents.Sex : 0)
      + (employee.birthDay != null ? this.persents.birthDay : 0)
      + (employee.idskill.length > 0 ? this.persents.idskill * employee.idskill.length : 0);
  }
}
