import template from './info.html';
import controller from './info.controller';
import './info.css';

const infoComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'infoCtrl'
};

export default infoComponent;
