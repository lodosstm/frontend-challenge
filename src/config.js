import angular from 'angular';
/* Application variables depending on the environment will be set there. */
const settings = angular.module('modAppSettings', [])

  .constant('APP_SETTINGS', {
    ENDPOINT: 'http://localhost:3000',
    AVATAR: 'http://dummyimage.com/150x150/c0c0c0',
    MAX_TAG: 8
  });

export default settings;
