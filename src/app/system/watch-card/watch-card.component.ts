import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../shared/services/employees.service";
import {Employee} from "../../shared/models/employee.model";
import {Router} from "@angular/router";

@Component({
  selector: 'task-watch-card',
  templateUrl: './watch-card.component.html',
  styleUrls: ['./watch-card.component.less']
})
export class WatchCardComponent implements OnInit {

  employee: Employee;

  constructor(private employeeService: EmployeesService,
              private router: Router) { }

  ngOnInit() {
    this.employee = this.employeeService.giveEmployee();
  }
}
