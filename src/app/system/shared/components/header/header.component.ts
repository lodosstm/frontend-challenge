import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../services/employees.service';

@Component({
  selector: 'task-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(private employeeService: EmployeesService) { }

  widthOfDisplay = document.body.clientWidth;

  ngOnInit() {
    window.onresize = () => {
      this.widthOfDisplay = document.body.clientWidth;
      if (this.widthOfDisplay > 992) {
        document.getElementById('sidebar').style.display = 'block';
        this.employeeService.open = false;
      } else {
        document.getElementById('sidebar').style.display = 'none';
      }
    };
  }

  openMenu() {
    if (this.employeeService.open) {
      document.getElementById('sidebar').style.display = 'none';
      this.employeeService.open = false;
    } else {
      document.getElementById('sidebar').style.display = 'block';
      this.employeeService.open = true;
    }
  }
}
