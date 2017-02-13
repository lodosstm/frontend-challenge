class StaffController {
  constructor($state, $stateParams, srvUser) {
    let vm = this;
    vm.name = 'staff';
    vm.bIsLoading = true;
    vm.aUsers = [];
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
  }
}

StaffController.$inject = ['$state', '$stateParams', 'srvUser'];

export default StaffController;
