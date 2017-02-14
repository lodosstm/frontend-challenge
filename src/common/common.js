import angular from 'angular';
import Staff from './staff/staff';
import Employee from './employee/employee';
import Info from './info/info';
import Tags from './tagsinput/tags.input';
import Avatar from './avatar/avatar';
import DatePicker from './datapicker/datapicker';

const commonModule = angular.module('app.commons', [
  Staff.name,
  Employee.name,
  Info.name,
  Tags.name,
  Avatar.name,
  DatePicker.name
]);

export default commonModule;
