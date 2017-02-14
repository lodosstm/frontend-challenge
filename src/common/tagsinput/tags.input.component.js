import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import './tags.input.css';
import template from './tags.input.html';
import controller from './tags.input.controller';

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
