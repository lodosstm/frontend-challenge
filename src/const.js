import angular from 'angular';
/* Application variables depending on the environment will be set there. */
const constant = angular.module('modAppConst', [])

  .constant('GENDER', (function () {
    let gender = [
      'Male',
      'Female'
    ];

    gender.MALE = 'Male';
    gender.FEMALE = 'Female';

    return gender;
  })()
  );

export default constant;
