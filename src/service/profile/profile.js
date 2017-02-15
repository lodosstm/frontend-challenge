import angular from 'angular';
import ProfileService from './profile.factory';

const profileServiceModule = angular.module('profile.service', [])

  .service('profileService', ProfileService);

export default profileServiceModule;
