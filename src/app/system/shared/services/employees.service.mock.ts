import {Injectable} from '@angular/core';
import {Employee} from '../../../shared/models/employee.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class MockEmployeesService {
  // givenemployee: Employee;
  public employees: Employee;
  // public flag = false;

  constructor () { }

  getEmployees() {
    return new Employee (
      'photo', 'name', 'name', 'male', '22.22.2000', 'position', [4, 5], 'some text',
      40, 1);
  }

  createNewEmployee(employee: Employee): Observable<Employee> {
    const empl: Employee = {
      photo: 'photo',
      firstName: 'name',
      lastName: 'name',
      Sex: 'male',
      birthDay: '22.22.2000',
      position: 'position',
      idskill: [4, 5],
      characteristic: 'some text',
      progress: 40,
      id: 1
    };
    return Observable.of(empl);
  }

  updateNewEmployee(id: number, employee: Employee) {
    return {
      photo: 'photo',
      firstName: 'name',
      lastName: 'name',
      Sex: 'male',
      birthDay: '22.22.2000',
      position: 'position',
      idskill: [4, 5],
      characteristic: 'some text',
      progress: 40,
      id: 1
    };
  }

  deleteEmployee (id: number) {
    return {
      photo: 'photo',
      firstName: 'name',
      lastName: 'name',
      Sex: 'male',
      birthDay: '22.22.2000',
      position: 'position',
      idskill: [4, 5],
      characteristic: 'some text',
      progress: 40,
      id: id
    };
  }

  bringEmployee(item) { }

  getEmployeeById(id: number): Observable<Employee> {
    return Observable.of({
      photo: 'photo',
      firstName: 'name',
      lastName: 'name',
      Sex: 'male',
      birthDay: '22.22.2000',
      position: 'position',
      idskill: [4, 5],
      characteristic: 'some text',
      progress: 40,
      id: id
    });
  }

  giveEmployee() {
    return {
      photo: 'photo',
      firstName: 'name',
      lastName: 'name',
      Sex: 'male',
      birthDay: '22.22.2000',
      position: 'position',
      idskill: [4, 5],
      characteristic: 'some text',
      progress: 40,
      id: 1
    };
  }

  ChangeFlag() { }

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

  updateEmployees() { }
}
