import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {Employee} from "../../../shared/models/employee.model";
import {BaseApi} from "../../../shared/core/base-api";


@Injectable()
export class EmployeesService extends BaseApi{
  constructor (public http: Http) {
    super(http);
  }

  getEmployees(): Observable<Employee>{
    return this.get('employee');
  }
}
