import angular from 'angular';
import staffComponent from './staff.component';

const staffModule = angular.module('staff', [
])
  .component('staff', staffComponent);

export default staffModule;
