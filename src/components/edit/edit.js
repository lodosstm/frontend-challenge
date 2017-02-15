import angular from 'angular';
import uiRouter from 'angular-ui-router';
import editComponent from './edit.component';

const editModule = angular.module('edit', [
  uiRouter
])

  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('edit', {
        component: 'edit',
        url: '/',
        template: '<edit></edit>',
        params: {
          id: {
            value: null,
            squash: true
          }
        }
      });
  })

  .component('edit', editComponent);

export default editModule;
