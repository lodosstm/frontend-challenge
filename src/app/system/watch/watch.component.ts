import { Component, OnInit } from '@angular/core';
import {Employee} from '../../shared/models/employee.model';
import {EmployeesService} from '../shared/services/employees.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'task-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.less']
})
export class WatchComponent implements OnInit {

  id: number;
  employee: Employee;
  skills = [];

  constructor(private employeeService: EmployeesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'), 10);
      this.employee = this.employeeService.giveEmployee();
    });
    this.employeeService.getEmployeeById(this.id).subscribe((data: Employee) => {
      this.employee = data;
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.id).subscribe((data: Employee) => {
      this.employeeService.updateEmployees();
        this.employeeService.getEmployeeById(this.id).isEmpty();
        {
          this.router.navigate(['/system']);
        }
    });
  }

  deleteCard() {
    this.router.navigate(['/system']);
  }

}
