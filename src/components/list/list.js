import angular from 'angular';
import uiRouter from 'angular-ui-router';
import listComponent from './list.component';

const listModule = angular.module('list', [
  uiRouter
])

  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('list', {
        url: '/',
        component: 'list',
        template: '<list></list>'
      });
  })

  .component('list', listComponent);

export default listModule;
