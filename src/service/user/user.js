import angular from 'angular';
import User from './user.resource';
import UserService from './user.factory';

const userServiceModule = angular.module('user.service', [])

  .service('User', User)
  .service('userService', UserService);

export default userServiceModule;
