import template from './employee.html';
import controller from './employee.controller';

const employeeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'emplCtrl'
};

export default employeeComponent;
