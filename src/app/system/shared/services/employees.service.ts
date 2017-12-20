import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Employee} from '../../../shared/models/employee.model';
import {BaseApi} from '../../../shared/core/base-api';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Injectable()
export class EmployeesService extends BaseApi {
  givenemployee: Employee;
  public open = false;
  public employees: Employee;
  public flag = false;
  public save =false;

  constructor (public http: Http) {
    super(http);
  }

  public getEmployees(): Observable<Employee> {
    return this.get('employee');
  }

  public createNewEmployee(employee: Employee): Observable<Employee> {
    return this.post('employee', employee);
  }

  public updateNewEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.put(`employee/${id}`, employee);
  }

  public deleteEmployee (id: number) {
    return this.delete(`employee/${id}`);
  }

  public bringEmployee(item) {
    this.givenemployee = item;
    this.flag = true;
  }

  public HardDelete(id) {
    this.deleteEmployee(id).subscribe(() => {
      this.save = true;
    });
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.get(`employee?id=${id}`)
      .map((employee: Employee[]) => employee[0] ? employee[0] : undefined);
  }

  public giveEmployee() {
    return this.givenemployee;
  }

  InitEmployee() {
    return new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'position': new FormControl(null, [Validators.required]),
      'sex': new FormControl(null, [Validators.required]),
      'birthday': new FormControl(null, [Validators.required]),
      'character': new FormControl(null, []),
      'skill': new FormControl(null, [])
    });
  }

  updateEmployees() {
    this.getEmployees().subscribe((data: Employee) => {
      this.employees = data;
    });
  }
}
