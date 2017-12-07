import {Component, OnInit} from '@angular/core';

import {EmployeesService} from './shared/services/employees.service';

@Component({
  selector: 'task-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})

export class SystemComponent implements OnInit {
  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {
    this.employeeService.updateEmployees();
  }
}
