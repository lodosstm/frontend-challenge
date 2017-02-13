import angular from 'angular';
import uiRouter from 'angular-ui-router';
import staffComponent from './staff.component';

const staffModule = angular.module('staff', [
  uiRouter
])
  .component('staff', staffComponent);

export default staffModule;
