class EmployeeController {
  constructor($state, $stateParams, userService, GENDER, APP_SETTINGS) {
    let vm = this;
    let id = $stateParams.id;
    vm.genderSelect = GENDER;
    vm.defaultAvatar = APP_SETTINGS.AVATAR;
    vm.state = $state;
    vm.isLoading = false;
    vm.form = {};
    vm.user = {
      skill: []
    };
    vm.error = '';

    if (id) {
      vm.isLoading = true;
      /* Fetch user by id */
      userService.getUser(id)
        .$promise
        .then((data) => {
          vm.user = data;
          vm.isLoading = false;
        })
        .catch((error) => {
          vm.user = {};
          vm.isLoading = true;
          vm.error = error;
        });
    }

    vm.setGender = (value) => {
      vm.user.gender = value;
    };

    /* Add user to the store */
    vm.addUser = () => {
      vm.isLoading = true;
      userService.addUser(vm.user)
        .$promise
        .then((data) => {
          vm.user = data;
          $state.go('detail', { id: vm.user.id });
        })
        .catch((error) => {
          vm.isLoading = false;
          vm.error = error;
          vm.resetForm();
        });
    };

    /* Edit the user*/
    vm.editUser = () => {
      vm.isLoading = true;
      userService.editUser(vm.user)
        .$promise
        .then(() => {
          $state.go('detail', { id: vm.user.id });
        })
        .catch((error) => {
          vm.isLoading = false;
          vm.error = error;
        });
    };

    vm.resetForm = () => {
      if (vm.form.userForm) {
        vm.form.userForm.$setPristine();
      }
    };
  }
}
EmployeeController.$inject = ['$state', '$stateParams', 'userService', 'GENDER', 'APP_SETTINGS'];
export default EmployeeController;
