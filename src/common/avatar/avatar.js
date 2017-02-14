import angular from 'angular';
import 'bootstrap';
import 'angular-ui-bootstrap';
import 'angular-sanitize';
import avatarComponent from './avatar.component';

const avatarModule = angular.module('avatar', [
  'ngSanitize', 'ui.bootstrap'
])
  .component('avatar', avatarComponent);

export default avatarModule;
