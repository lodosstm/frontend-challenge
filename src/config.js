import angular from 'angular';
/* Application variables depending on the environment will be set there. */
const settings = angular.module('modAppSettings', [])

  .constant('APP_SETTINGS', {
    ENDPOINT: 'http://localhost:3000'
  });

export default settings;
