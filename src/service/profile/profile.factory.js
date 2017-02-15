import _ from 'lodash';

class ProfileService {
  constructor(PROFILE) {
    this.PROFILE = PROFILE;
  }

  /*  Calculate  progress of the profile */
  calcProgress(user) {
    let progress = 0;
    let vm = this;
    _.forEach(vm.PROFILE, (value) => {
      if (_.isArray(user[value.field]) && vm.PROFILE.SKILL === value.field) {
        progress += value.filling * user[value.field].length;
      } else if (!_.isEmpty(user[value.field])) {
        progress += value.filling;
      }
    });
    return progress;
  }

}
ProfileService.$inject = ['PROFILE'];

export default ProfileService;
