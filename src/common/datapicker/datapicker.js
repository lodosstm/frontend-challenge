import angular from 'angular';
import 'angular-datepicker';
import dateComponent from './datapicker.component';

const dateModule = angular.module('datepicker', [
  'datePicker'
])
  .component('datepicker', dateComponent);

export default dateModule;
