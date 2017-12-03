import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {Employee} from "../../../shared/models/employee.model";
import {BaseApi} from "../../../shared/core/base-api";
import {Router} from "@angular/router";


@Injectable()
export class EmployeesService extends BaseApi{
  givenemployee: Employee;
  public flag = false;

  constructor (public http: Http) {
    super(http);
  }

  public getEmployees(): Observable<Employee>{
    return this.get('employee');
  }

  public createNewEmployee(employee: Employee): Observable<Employee>{
    return this.post('employee', employee);
  }

  public updateNewEmployee(id:number, employee: Employee): Observable<Employee>{
    return this.put(`employee/${id}`, employee);
  }

  public deleteEmployee (id:number): Observable<Employee>{
    return this.delete(`employee/${id}`);
  }

  public bringEmployee(item){
    this.givenemployee=item;
    this.flag=true;
  }

  public getEmployeeById(id:number): Observable<Employee>{
    return this.get(`employee?id=${id}`)
      .map((employee: Employee[]) => employee[0] ? employee[0] : undefined);
  }

  public giveEmployee(){
    return this.givenemployee;
  }

  public ChangeFlag(){
    this.flag = false;
  }
}
