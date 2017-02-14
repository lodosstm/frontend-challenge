import angular from 'angular';
import UserService from '../service/user/user';
import TagService from '../service/tag/tag';

const servicesModule = angular.module('app.services', [
  UserService.name,
  TagService.name,
]);

export default servicesModule;
