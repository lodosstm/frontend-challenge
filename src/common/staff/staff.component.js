import template from './staff.html';
import controller from './staff.controller';
import './staff.css';

const staffComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'staffCtrl'
};

export default staffComponent;
