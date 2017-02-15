import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailComponent from './detail.component';

const detailModule = angular.module('detail', [
  uiRouter
])

  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('detail', {
        component: 'detail',
        url: '/',
        template: '<detail></detail>',
        params: {
          id: {
            value: null,
            squash: true
          }
        }
      });
  })

  .component('detail', detailComponent);

export default detailModule;
