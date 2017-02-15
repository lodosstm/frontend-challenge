import './avatar.css';
import template from './avatar.html';
import controller from './avatar.controller';

const avatarComponent = {
  transclude: true,
  bindings: {
    avatar: '='
  },
  template,
  controller,
  controllerAs: 'avatarCtrl'
};

export default avatarComponent;
