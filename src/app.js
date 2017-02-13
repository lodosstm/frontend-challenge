import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

import './css/style.css';

angular.module('staffApp', [
  uiRouter,
  Common.name,
  Components.name
])
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
