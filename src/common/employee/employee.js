import angular from 'angular';
import employeeComponent from './employee.component';

const employeeModule = angular.module('employee', [
])
  .component('employee', employeeComponent);

export default employeeModule;
