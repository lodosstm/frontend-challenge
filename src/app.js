import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import Service from './service/service';
import AppSetting from './config';

import './css/style.css';

angular.module('staffApp', [
  uiRouter,
  ngResource,
  Common.name,
  Components.name,
  AppSetting.name,
  Service.name
])
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
