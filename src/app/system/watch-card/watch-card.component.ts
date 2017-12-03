import { Component, OnInit } from '@angular/core';
import {EmployeesService} from "../shared/services/employees.service";
import {Employee} from "../../shared/models/employee.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'task-watch-card',
  templateUrl: './watch-card.component.html',
  styleUrls: ['./watch-card.component.less']
})
export class WatchCardComponent implements OnInit {

  id: number;
  employee: Employee;
  private subscription: Subscription;

  constructor(private employeeService: EmployeesService,
              private router: Router,
              private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.id = parseInt(params.get('id'));
      this.employeeService.getEmployeeById(this.id)
        .subscribe((employee: Employee)=>{
          this.employee = employee;
        });
    });
  }

  onClick(){
    this.employeeService.ChangeFlag();
    this.router.navigate(['/system']);
  }
}
