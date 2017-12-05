import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";

import {Employee} from "../../shared/models/employee.model";
import {EmployeesService} from "../shared/services/employees.service";
import {SkillsService} from "../shared/services/skills.service";
import {Skill} from "../../shared/models/skill.module";
import {ActivatedRoute, Router} from "@angular/router";

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

  add(event: MatChipInputEvent) {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim() && this.skills.length<5) {
      this.skills.push(value.trim());
      this.result.length = 0;
    }
    if (input && this.skills.length<=5) {
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
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'firstname': new FormControl(null, []),
      'lastname': new FormControl(null, []),
      'position': new FormControl(null, []),
      'sex': new FormControl(null, []),
      'birthday': new FormControl(null, []),
      'character': new FormControl(null, []),
      'skill': new FormControl(null, [])
    });
    this.employeeService.createNewEmployee(this.InitEmployee())
      .subscribe((employ: Employee)=>{this.id=employ.id});
    this.skillsService.getAllSkills()
      .subscribe((skills: Skill) => {
        this.searchable = skills;
      });
    this.search();
    this.calculator();
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
                this.idskills[i] = skilli.id;
              }
            });
          }
        });
      }
    }
    let str=null;
    if(this.form.value.birthDay!=null){
      str=this.form.value.birthday.substring(0,10);
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
    const employee = this.InitEmployee();
    this.employeeService.updateNewEmployee(this.id, employee).subscribe((employee: Employee)=>{

    });
    this.router.navigate(['/system']);
  }

  UpdateBase() {
    this.search();
    this.calculator();
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
    this.result.length = 0;
    this.form.value.skill = '';
    this.UpdateBase();
  }

  search() {
    let k = 0;
    this.result.length = 0;
    if (this.form.value.skill != '') {
      for (let j in this.searchable) {
        if (this.searchable[j].skillName.indexOf(this.form.controls.skill.value) == 0 && this.form.controls.skill.value.length <= this.searchable[j].skillName.length) {
          this.result[k] = this.searchable[j].skillName;
          k++;
        }
      }
    }
  }

  calculator(){
    this.percentsEmployee=20;
    const employee = this.InitEmployee();
    if(employee.firstName!=null){
      this.percentsEmployee+=this.persents.firstName;
      console.log(this.percentsEmployee);
    }
    if(employee.lastName!=null){
      this.percentsEmployee+=this.persents.lastName;
      console.log(this.percentsEmployee);
    }
    if(employee.position!=null){
      this.percentsEmployee+=this.persents.position;
      console.log(this.percentsEmployee);
    }
    if(employee.characteristic!=null){
      this.percentsEmployee+=this.persents.characteristic;
      console.log(this.percentsEmployee);
    }
    if(employee.Sex!=null){
      this.percentsEmployee+=this.persents.Sex;
      console.log(this.percentsEmployee);
    }
    if(employee.birthDay!=null){
      this.percentsEmployee+=this.persents.birthDay;
      console.log(this.percentsEmployee);
    }
    if(employee.idskill.length>0){
      this.percentsEmployee+=this.persents.idskill*employee.idskill.length;
      console.log(this.percentsEmployee);
    }
  }
}
