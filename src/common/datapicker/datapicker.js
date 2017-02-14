import angular from 'angular';
import dateComponent from './datapicker.component';

const dateModule = angular.module('datepicker', [
])
  .component('datepicker', dateComponent);

export default dateModule;
