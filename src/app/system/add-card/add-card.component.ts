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
  searchable: object;
  result = [];
  id: number;
  birthDay = [];
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
    this.skillsService.getAllSkills()
      .subscribe((skills: Skill) => { this.searchable = skills; });
    this.search();
    this.calculator();
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.skills.length < 5) {
      this.skills.push(value.trim());
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
    if (this.skills.length !== 0) {
      for (const i in this.skills) {
        if (this.skills.hasOwnProperty(i)) {
          this.skillsService.getSkillByName(this.skills[i]).subscribe((skill: Skill) => {
            if (skill) {
              this.idskills[i] = skill.id;
            } else {
              const skills = new Skill(this.skills[i]);
              this.skillsService.createNewSkill(skills).subscribe((skillsi: Skill) => {
                if (!skillsi) {
                  alert('Error of creating skill!');
                }
              });
              this.skillsService.getSkillByName(this.skills[i]).subscribe((skilli: Skill) => {
                if (skilli) {
                  this.idskills[i] = skilli.id;
                }
              });
            }
          });
        }
      }
    }
    let str = null;
    if (this.form.value.birthDay != null) {
      str = this.form.value.birthday.substring(0, 10);
    }
    return new Employee('http://dummyimage.com/150',
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.sex,
      str,
      this.form.value.position,
      this.idskills,
      this.form.value.character,
      this.percentsEmployee);
  }

  onSubmit() {
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee());
    this.router.navigate(['/system']);
  }

  UpdateBase() {
    this.search();
    this.calculator();
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee());
  }

  deleteCard() {
    this.employeeService.deleteEmployee(this.id);
  }

  itemClick(i) {
    this.skills.push(this.result[i].trim());
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
      for (const j in this.searchable) {
        if (this.searchable.hasOwnProperty(j)) {
            if (this.searchable[j].skillName.indexOf(this.form.controls.skill.value) === 0
              && this.form.controls.skill.value.length <= this.searchable[j].skillName.length) {
            this.result[k] = this.searchable[j].skillName;
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
