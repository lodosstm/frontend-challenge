import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'task-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements  OnInit {
  constructor (private router: Router){

  }

  ngOnInit () {
    this.router.navigate(['/login']);
  }
}
