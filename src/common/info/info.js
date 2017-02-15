import angular from 'angular';
import infoComponent from './info.component';

const infoModule = angular.module('info', [
])
  .component('info', infoComponent);

export default infoModule;
