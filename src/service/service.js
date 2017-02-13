import angular from 'angular';
import UserService from '../service/user/user';

const servicesModule = angular.module('app.services', [
  UserService.name,
]);

export default servicesModule;
