import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {SkillsService} from '../shared/services/skills.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Skill} from '../../shared/models/skill.module';
import {_document} from '@angular/platform-browser/src/browser';

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
  employee = new Employee('', '', '', '', '', '', [], '', 0);
  percentsEmployee: number;
  date: Date;
  step = 30;

  constructor(private employeeService: EmployeesService,
              private skillsService: SkillsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
    });
    if (this.employeeService.open) {
      document.getElementById('sidebar').style.display = 'none';
      this.employeeService.open = false;
    }
    this.myGroup = new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'position': new FormControl(null, [Validators.required]),
      'sex': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      'character': new FormControl(null, []),
      'skill': new FormControl(null, [])
    });
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      if (this.employeeService.givenemployee === undefined) {
        this.employeeService.bringEmployee(this.employee);
      }
      this.date = this.employee.birthDay !== undefined && this.employee.birthDay !== null ?
          new Date(this.employee.birthDay.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) : null;
      this.myGroup.value.firstname = this.employee.firstName;
      this.myGroup.value.lastname = this.employee.lastName;
      this.myGroup.value.position = this.employee.position;
      this.myGroup.value.sex = this.employee.Sex;
      this.myGroup.value.birthday = this.date;
      this.myGroup.value.character = this.employee.characteristic;
      if (this.employee.birthDay !== undefined && this.employee.birthDay !== null) {
          this.birthDay = [this.myGroup.value.birthday.getDate(),
            this.myGroup.value.birthday.getMonth() + 1,
            this.myGroup.value.birthday.getFullYear()].join('.');
        }
      this.idskills = this.employee.idskill;
      this.searchSkill();
      this.skillsService.Skills();
      this.calculator();
      this.percentsEmployee = this.employee.progress;
    });
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

  item1() {
    const el = document.getElementsByClassName('mat-option');
    for (const i in el) {
      if (el.hasOwnProperty(i)) {
        el[i].classList.remove('active-select-two');
        console.log(el[i].classList);
      }
    }
  }

  item2() {
    const el = document.getElementsByClassName('mat-option');
    for (const i in el) {
      if (el.hasOwnProperty(i)) {
        el[i].classList.add('active-select-two');
        console.log(el[i].classList);
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
          this.proverka();
        });
      }
    }
  }

  proverka () {
    if (this.skills.length === 5) {
      document.getElementById('skill').setAttribute('disabled', 'disabled');
    } else {
      document.getElementById('skill').removeAttribute('disabled');
    }
  }

  add(event: MatChipInputEvent) {
    const value = event.value;
    const input = event.input;
    if (this.checkSkill(value)) {
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
      this.proverka();
    }
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

  checkSkill(skill: string) {
    if (this.skills.indexOf(skill) === -1) {
      return true;
    }
    return false;
  }

  onSubmit() {
    this.employeeService.updateNewEmployee(this.id, this.InitEmployee()).subscribe((data: Employee) => {
      if (data) {
        document.getElementById('sidebar').classList.remove('sidebar_opened');
        this.employeeService.flag = false;
        this.employeeService.updateEmployees();
        this.router.navigate(['/system']);
      }
    });
  }

  SelectionChange(event) {
    this.myGroup.value.birthday = event.value;
    if (event.value !== null && event.value !== '') {
      this.birthDay = [this.myGroup.value.birthday.getDate(),
        this.myGroup.value.birthday.getMonth() + 1,
        this.myGroup.value.birthday.getFullYear()].join('.');
    } else {
      this.birthDay = null;
    }
  }

  returnCard() {
    document.getElementById('sidebar').classList.remove('sidebar_opened');
    this.employeeService.flag = false;
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
    }
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
          if ( this.skillsService.skills[j].skillName.toLowerCase().indexOf(event) !== -1
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
      + (employee.firstName !== null && employee.firstName !== '' ? this.persents.firstName : 0)
      + (employee.lastName !== null && employee.lastName !== '' ? this.persents.lastName : 0)
      + (employee.position !== null && employee.position !== '' ? this.persents.position : 0)
      + (employee.characteristic !== null && employee.characteristic !== '' ? this.persents.characteristic : 0)
      + (employee.Sex !== null && employee.Sex !== '' ? this.persents.Sex : 0)
      + (employee.birthDay !== null && employee.birthDay !== '' ? this.persents.birthDay : 0)
      + (employee.idskill.length > 0 ? this.persents.idskill * employee.idskill.length : 0);
  }
}
