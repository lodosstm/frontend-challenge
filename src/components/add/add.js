import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addComponent from './add.component';

const addModule = angular.module('add', [
  uiRouter
])

  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('add', {
        component: 'add',
        url: '/',
        template: '<add></add>'
      });
  })

  .component('add', addComponent);

export default addModule;
