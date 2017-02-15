import angular from 'angular';
import 'angular-sanitize';
import avatarComponent from './avatar.component';

const avatarModule = angular.module('avatar', [
  'ngSanitize'
])
  .component('avatar', avatarComponent);

export default avatarModule;
