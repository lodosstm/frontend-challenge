class StaffController {
  constructor($state, $stateParams, userService, APP_SETTINGS) {
    let vm = this;
    let id = $stateParams.id;
    vm.isLoading = true;
    vm.users = [];
    vm.error = '';
    vm.defaultAvatar = APP_SETTINGS.AVATAR;
    /* Fetch users list */
    userService.getUsers()
      .$promise
      .then((data) => {
        vm.isLoading = false;
        vm.users = data;
      })
      .catch((error) => {
        vm.isLoading = false;
        vm.error = error;
      });

    vm.fnGoToDetail = (userId) => {
      $state.go('detail', { id: userId });
    };

    vm.fnIsActive = (userId) => {
      return id === userId;
    };
  }
}

StaffController.$inject = ['$state', '$stateParams', 'userService', 'APP_SETTINGS'];

export default StaffController;
