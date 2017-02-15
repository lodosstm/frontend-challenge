class InfoController {
  constructor($state, $stateParams, userService, APP_SETTINGS) {
    let vm = this;
    let id = $stateParams.id;
    vm.defaultAvatar = APP_SETTINGS.AVATAR;
    vm.isLoading = true;
    vm.error = '';

    /* Fetch users list */
    userService.getUser(id)
      .$promise
      .then((data) => {
        vm.user = data;
        vm.isLoading = false;
      })
      .catch((error) => {
        vm.isLoading = false;
        vm.user = {};
        vm.error = error;
      });

    /* Remove user from the store by id */
    vm.fnRemoveUser = (userId) => {
      vm.isLoading = true;
      userService.removeUser(userId)
        .$promise
        .then(() => {
          $state.go('list');
        })
        .catch((error) => {
          vm.error = error;
        });
    };
  }
}
InfoController.$inject = ['$state', '$stateParams', 'userService', 'APP_SETTINGS'];
export default InfoController;
