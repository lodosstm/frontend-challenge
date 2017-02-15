import angular from 'angular';
import UserService from '../service/user/user';
import TagService from '../service/tag/tag';
import ProfileService from '../service/profile/profile';

const servicesModule = angular.module('app.services', [
  UserService.name,
  TagService.name,
  ProfileService.name,
]);

export default servicesModule;
