import angular from 'angular';
import Staff from './staff/staff';
import Employee from './employee/employee';
import Info from './info/info';

const commonModule = angular.module('app.commons', [
  Staff.name,
  Employee.name,
  Info.name
]);

export default commonModule;
