import template from './tags.input.html';
import controller from './tags.input.controller';
import './tags.input.css';


const tagsComponent = {
  bindings: {
    tags: '=',
    disabled: '<'
  },
  template,
  controller,
  controllerAs: 'tagsInputCtrl'
};

export default tagsComponent;
