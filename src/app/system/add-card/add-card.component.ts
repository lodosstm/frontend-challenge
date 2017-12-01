import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'task-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.less']
})
export class AddCardComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'firstname': new FormControl(null, []),
      'lastname': new FormControl(null, []),
      'sex': new FormControl(null, []),
      'birthday': new FormControl(null, []),
      'character': new FormControl(null, [])
    });
  }

  onSubmit(){

  }


  UpdateBase(){

  }

  deleteCard(){

  }
}
