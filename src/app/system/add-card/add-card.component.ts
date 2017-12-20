import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';

import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {SkillsService} from '../shared/services/skills.service';
import {Skill} from '../../shared/models/skill.module';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'task-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit, OnDestroy {

  form: FormGroup;
  selectable = true;
  removable = true;
  save = false;
  subscribe: Subscription;

  skills = [];
  idskills = [];
  event: MatChipInputEvent;
  result = [];
  id: number;
  index = -1;
  birthDay: string;
  step = 30;
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
    if (document.getElementById('sidebar') !== null) {
      document.getElementById('sidebar').classList.add('sidebar_opened');
    }
    if (this.employeeService.open === true && document.getElementById('sidebar') !== null) {
      document.getElementById('sidebar').style.display = 'none';
      this.employeeService.open = false;
    }
    this.subscribe = this.employeeService.createNewEmployee(this.InitEmployee())
      .subscribe((employ: Employee) => { this.id = employ.id; });
    this.skillsService.Skills();
    this.calculator();
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

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    // if (this.save === false) {
    //   this.employeeService.deleteEmployee(this.id).subscribe(() => {
    //     this.employeeService.updateEmployees();
    //   });
    //   if (document.getElementById('sidebar') !== null) {
    //     document.getElementById('sidebar').classList.remove('sidebar_opened');
    //   }
    // }
  }

  checkSkill(skill: string) {
    if (this.skills.indexOf(skill) === -1) {
      return true;
    }
    return false;
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if (this.checkSkill(event.value)) {
      if ((value || '').trim() && this.skills.length < 5) {
        this.skills.push(value.trim());
        const index = this.skills.length - 1;
        if (index + 1 !== 0) {
          this.skillsService.getSkillByName(this.skills[index]).subscribe((skill: Skill) => {
            if (skill) {
              this.idskills[index] = skill.id;
            } else {
              const skills = new Skill(this.skills[index]);
              this.skillsService.createNewSkill(skills).subscribe((data: Skill) => {
                if (data) {
                  this.skillsService.getSkillByName(this.skills[index]).subscribe((skilli: Skill) => {
                    if (skilli) {
                      this.idskills[index] = skilli.id;
                    }
                  });
                  // alert('Error of creating skill!');
                }
              });
            }
          });
        }
        this.result.length = 0;
      }
    }
    if (input && this.skills.length <= 5) {
      input.value = '';
    }
    this.proverka();
  }

  remove(fruit) {
    const index = this.skills.indexOf(fruit);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
    this.skillsService.getSkillByName(fruit).subscribe(data => {
      this.idskills.splice(this.idskills.indexOf(data.id), 1);
    });
    this.proverka();
  }

  proverka () {
    if (this.skills.length === 5) {
      document.getElementById('skill').setAttribute('disabled', 'disabled');
    } else {
      document.getElementById('skill').removeAttribute('disabled');
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
    this.save = true;
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee()).subscribe((data: Employee) => {
      if (data) {
        this.employeeService.updateEmployees();
        if (document.getElementById('sidebar') !== null) {
          document.getElementById('sidebar').classList.remove('sidebar_opened');
        }
        this.router.navigate(['/system']);
      }
    });
  }

  UpdateBase() {
    this.result.length = 0;
    this.index = -1;
    let empl: Employee;
    empl = this.InitEmployee();
    this.employeeService.updateNewEmployee(this.id, empl).subscribe(data => {
      if (data) {
        this.calculator();
      }
    });
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
    this.router.navigate(['/system']);
  }

  itemClick(i) {
    if (this.checkSkill(this.result[i])) {
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
      this.proverka();
      this.addItem(input);
      this.UpdateBase();
    }
  }

  addItem(input) {
    if (input && this.skills.length <= 5) {
      input.value = '';
    }
  }

  addEvent(event) {
    this.event = event;
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

  search(event) {
    let k = 0;
    this.result.length = 0;
    if (event !== undefined) {
      for (const j in this.skillsService.skills) {
        if (this.skillsService.skills.hasOwnProperty(j)) {
          if ( this.skillsService.skills[j].skillName.toLowerCase().indexOf(event) !== -1
            && event.length <= this.skillsService.skills[j].skillName.length) {
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
