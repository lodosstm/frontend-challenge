import angular from 'angular';
import uiRouter from 'angular-ui-router';
import infoComponent from './info.component';

const infoModule = angular.module('info', [
  uiRouter
])
  .component('info', infoComponent);

export default infoModule;
