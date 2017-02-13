class StaffController {
  constructor($state, $stateParams, srvUser, APP_SETTINGS) {
    let vm = this;
    let nId = $stateParams.id;
    vm.name = 'staff';
    vm.bIsLoading = true;
    vm.aUsers = [];
    vm.sError = '';
    vm.sDefaultAvatar = APP_SETTINGS.AVATAR;
    /* Fetch users list */
    srvUser.getUsers()
      .then(function (oData) {
        vm.bIsLoading = false;
        vm.aUsers = oData;
      })
      .catch(function (oError) {
        vm.bIsLoading = false;
        vm.sError = oError;
      });

    vm.fnGoToDetail = function (nUserId) {
      $state.go('detail', { id: nUserId });
    };

    vm.fnIsActive = function (nUserId) {
      return nId === nUserId;
    };
  }
}

StaffController.$inject = ['$state', '$stateParams', 'srvUser', 'APP_SETTINGS'];

export default StaffController;
