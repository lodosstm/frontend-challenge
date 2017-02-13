class StaffController {
  constructor($state, $stateParams, srvUser) {
    let vm = this;
    let nId = $stateParams.id;
    vm.name = 'staff';
    vm.bIsLoading = true;
    vm.aUsers = [];
    vm.sError = '';
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

StaffController.$inject = ['$state', '$stateParams', 'srvUser'];

export default StaffController;
