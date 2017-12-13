import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';

import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {SkillsService} from '../shared/services/skills.service';
import {Skill} from '../../shared/models/skill.module';
import {Router} from '@angular/router';

@Component({
  selector: 'task-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit {

  form: FormGroup;
  selectable = true;
  removable = true;

  skills = [];
  idskills = [];
  result = [];
  id: number;
  birthDay: string;
  percentsEmployee = 20;
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

  constructor(private employeeService: EmployeesService,
              private skillsService: SkillsService,
              private router: Router) {}

  ngOnInit() {
    this.form = this.employeeService.InitEmployee();
    this.employeeService.createNewEmployee(this.InitEmployee())
      .subscribe((employ: Employee) => { this.id = employ.id; });
    this.skillsService.Skills();
    this.search();
    this.calculator();
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
      console.log(input);
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
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.sex,
      this.birthDay,
      this.form.value.position,
      this.idskills,
      this.form.value.character,
      this.percentsEmployee);
  }

  onSubmit() {
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee()).subscribe((data: Employee) => {
      if (data) {
        this.employeeService.updateEmployees();
        this.router.navigate(['/system']);
      }
    });
  }

  UpdateBase() {
    let empl: Employee;
    empl = this.InitEmployee();
    this.employeeService.updateNewEmployee(this.id, empl).subscribe(data => {
      if (data) {
        this.search();
        this.calculator();
      }
    });
  }

  SelectionChange(event) {
    this.form.value.birthday = event.value;
    const day = this.form.value.birthday.getDate() < 10 ? '0' + this.form.value.birthday.getDate() : this.form.value.birthday.getDate();
    const month = (this.form.value.birthday.getMonth() + 1);
    const year = this.form.value.birthday.getFullYear();
    this.birthDay = [day,
      month < 10 ? '0' + month : month,
      year].join('.');
    this.UpdateBase();
  }

  deleteCard() {
    this.employeeService.deleteEmployee(this.id).subscribe(() => {
      this.employeeService.updateEmployees();
      this.employeeService.getEmployeeById(this.id).isEmpty();
      {
        this.router.navigate(['/system']);
      }
    });
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
    const input = document.getElementById('skill');
    this.addItem(input);
    this.UpdateBase();
  }

  addItem(input) {
    if (input && this.skills.length <= 5) {
      console.log(input);
      input.value = '';
    }
  }

  search() {
    let k = 0;
    this.result.length = 0;
    if (this.form.value.skill !== '') {
      for (const j in this.skillsService.skills) {
        if (this.skillsService.skills.hasOwnProperty(j)) {
            if (this.skillsService.skills[j].skillName.indexOf(this.form.controls.skill.value) === 0
              && this.form.controls.skill.value.length <= this.skillsService.skills[j].skillName.length) {
            this.result[k] = this.skillsService.skills[j].skillName;
            k++;
          }
        }
      }
    }
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
