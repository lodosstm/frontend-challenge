import angular from 'angular';
import uiRouter from 'angular-ui-router';
import employeeComponent from './employee.component';

const employeeModule = angular.module('employee', [
  uiRouter
])
  .component('employee', employeeComponent);

export default employeeModule;
