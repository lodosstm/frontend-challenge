import angular from 'angular';
/* Application variables depending on the environment will be set there. */
const constant = angular.module('modAppConst', [])

  .constant('GENDER', (() => {
    let gender = [
      'Male',
      'Female'
    ];

    gender.MALE = 'Male';
    gender.FEMALE = 'Female';

    return gender;
  })()
  )
  .constant('PROFILE', (() => {
    let profile = [
      { field: 'photo', filling: 20 },
      { field: 'last_name', filling: 5 },
      { field: 'first_name', filling: 5 },
      { field: 'gender', filling: 5 },
      { field: 'birthday', filling: 5 },
      { field: 'position', filling: 10 },
      { field: 'skill', filling: 5 },
      { field: 'characteristic', filling: 10 }
    ];

    /* Names variables of type array */
    profile.SKILL = 'skill';

    return profile;
  })()
  );

export default constant;
