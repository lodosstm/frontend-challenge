import template from './datapicker.html';
import controller from './datapicker.controller';
import './datapicker.css';
import './datapicker-style.css';

const birthdayComponent = {
  bindings: {
    date: '=',
    placeholder: '@'
  },
  template,
  controller,
  controllerAs: 'dateCtrl'
};

export default birthdayComponent;
