import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";

import {Employee} from "../../shared/models/employee.model";
import {EmployeesService} from "../shared/services/employees.service";
import {SkillsService} from "../shared/services/skills.service";
import {Skill} from "../../shared/models/skill.module";
import {Router} from "@angular/router";

@Component({
  selector: 'task-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit {

  form: FormGroup;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;

  skills = [];
  idskills = [];
  searchable: object;
  result = [];
  id: number;
  birthYear = [];
  birthMonth = [];
  birthDay = [];

  add(event: MatChipInputEvent) {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.skills.push(value.trim());
      this.result.length = 0;
    }
    if (input) {
      input.value = '';
    }
  }

  remove(fruit) {
    let index = this.skills.indexOf(fruit);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  constructor(private employeeService: EmployeesService,
              private skillsService: SkillsService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'firstname': new FormControl(null, []),
      'lastname': new FormControl(null, []),
      'position': new FormControl(null, []),
      'sex': new FormControl(null, []),
      'birthday': new FormControl(null, []),
      'character': new FormControl(null, []),
      'skill': new FormControl(null, []),
      'birthyear': new FormControl(null, []),
      'birthmonth': new FormControl(null, [])
    });
    this.employeeService.createNewEmployee(this.InitEmployee())
      .subscribe((employ: Employee)=>{this.id=employ.id});
    this.skillsService.getAllSkills()
      .subscribe((skills: Skill) => {
        this.searchable = skills;
      });
    this.search();
    let data = new Date();
    for(let i=1950;i<=data.getFullYear();i++){
      this.birthYear[i-1950] = i;
    }
    for(let i=0;i<30;i++){
      if(i<9){
        this.birthDay [i] = '0'+ (i+1);
      }else
        this.birthDay[i] = i+1;
    }
    for(let i=0;i<12;i++){
      if(i<9){
        this.birthMonth [i] = '0'+ (i+1);
      }else
        this.birthMonth[i] = i+1;
    }

  }

  InitEmployee() {
    if (this.skills.length != 0) {
      for (let i in this.skills) {
        this.skillsService.getSkillByName(this.skills[i]).subscribe((skill: Skill) => {
          if (skill) {
            this.idskills[i] = skill.id;
          } else {
            const skills = new Skill(this.skills[i]);
            this.skillsService.createNewSkill(skills).subscribe((skillsi: Skill)=>{});

            this.skillsService.getSkillByName(this.skills[i]).subscribe((skilli: Skill) => {
              if (skilli) {
                this.idskills[i] = skill.id;
              }
            });
          }
        });
      }
    }
    let str=this.form.value.birthday+"." + this.form.value.birthmonth+"." + this.form.value.birthyear;
    return new Employee('http://dummyimage.com/150',
      this.form.value.firstname,
      this.form.value.lastname,
      this.form.value.sex,
      str,
      this.form.value.position,
      this.idskills,
      this.form.value.character);
  }

  onSubmit() {
    const employee = this.InitEmployee();
    this.employeeService.updateNewEmployee(this.id, employee).subscribe((employee: Employee)=>{

    });
    this.router.navigate(['/system']);
  }

  UpdateBase() {
    this.search();
    const employee = this.InitEmployee();
    this.employeeService.updateNewEmployee(this.id, employee).subscribe((employee: Employee)=>{

    });
  }

  deleteCard() {
    this.employeeService.deleteEmployee(this.id).subscribe((employee: Employee)=>{});
    this.router.navigate(['/system']);
  }

  itemClick(i){
    this.skills.push(this.result[i].trim());
    this.form.value.skill = null;
    this.UpdateBase();
  }

  search() {
    let k = 0;
    this.result.length = 0;
    if (this.form.controls.skill.value != '') {
      for (let j in this.searchable) {
        if (this.searchable[j].skillName.indexOf(this.form.controls.skill.value) == 0 && this.form.controls.skill.value.length <= this.searchable[j].skillName.length) {
          this.result[k] = this.searchable[j].skillName;
          k++;
        }
      }
    }
  }
}
