import {Component, OnInit} from '@angular/core';

import {EmployeesService} from './shared/services/employees.service';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../shared/services/users.service';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'task-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.less']
})

export class SystemComponent implements OnInit {
  constructor(public employeeService: EmployeesService,
              public authService: AuthService,
              public router: Router,
              public userService: UsersService) {}
  step = 30;
  ngOnInit() {
    if (window.localStorage.getItem('username')) {
      this.userService.getUserByUsername(window.localStorage.getItem('username')).subscribe((user: User) => {
        if (user) {
          if (user.password === window.localStorage.getItem('password')) {
            this.authService.isAuthorated = true;
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
      this.employeeService.updateEmployees();
      const menu = 83;
      let windowClient = document.body.clientHeight;
      document.getElementById('sidebar').style.height = (windowClient - menu) + 'px';
      document.getElementById('employee').style.height = (windowClient - menu) + 'px';
      window.onresize = () => {
        windowClient = document.body.clientHeight;
        document.getElementById('sidebar').style.height = (windowClient - menu) + 'px';
        document.getElementById('employee').style.height = (windowClient - menu) + 'px';
      };
      document.getElementById('sidebar').addEventListener('wheel', (event) => {
        const $sidebar = document.getElementById('sidebar');
        if (0 < event.deltaY) {
          if ($sidebar.scrollTop + this.step <= $sidebar.scrollHeight) {
            $sidebar.scrollTop += this.step;
          } else {
            $sidebar.scrollTop = $sidebar.scrollHeight;
          }
        } else {
          if ($sidebar.scrollTop - this.step >= 0) {
            $sidebar.scrollTop -= this.step;
          } else {
            $sidebar.scrollTop = 0;
          }
        }
      });
  }
}
