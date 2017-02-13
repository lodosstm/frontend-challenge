import 'lodash';
import angular from 'angular';
import User from './user.resource';
import UserService from './user.factory';

const userServiceModule = angular.module('user.service', [])

  .factory('User', User)
  .service('srvUser', UserService);

export default userServiceModule;
