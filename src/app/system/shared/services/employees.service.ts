import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Employee} from '../../../shared/models/employee.model';
import {BaseApi} from '../../../shared/core/base-api';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';


@Injectable()
export class EmployeesService extends BaseApi {
  givenemployee: Employee;
  public flag = false;

  constructor (public http: Http,
               private router: Router) {
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
    return this.delete(`employee/?id=${id}`);
  }

  public bringEmployee(item) {
    this.givenemployee = item;
    this.flag = true;
  }

  public getEmployeeById(id: number): Observable<Employee> {
    return this.get(`employee?id=${id}`)
      .map((employee: Employee[]) => employee[0] ? employee[0] : undefined);
  }

  public giveEmployee() {
    return this.givenemployee;
  }

  public ChangeFlag() {
    this.flag = false;
  }

  InitEmployee() {
    return new FormGroup({
      'firstname': new FormControl(null, []),
      'lastname': new FormControl(null, []),
      'position': new FormControl(null, []),
      'sex': new FormControl(null, []),
      'birthday': new FormControl(null, []),
      'character': new FormControl(null, []),
      'skill': new FormControl(null, [])
    });
  }
}
