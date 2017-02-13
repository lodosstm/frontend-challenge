class InfoController {
  constructor($state, $stateParams, srvUser, APP_SETTINGS) {
    let vm = this;
    let nId = $stateParams.id;
    vm.sDefaultAvatar = APP_SETTINGS.AVATAR;
    vm.aTags = [];
    vm.bIsLoading = true;
    vm.sError = '';

    /* Fetch users list */
    srvUser.getUser(nId)
      .then(function (data) {
        vm.oUser = data;
        vm.bIsLoading = false;
      })
      .catch(function (oError) {
        vm.bIsLoading = false;
        vm.oUser = {};
        vm.sError = oError;
      });

    /* Remove user from the store by id */
    vm.fnRemoveUser = function (nUserId) {
      vm.bIsLoading = true;
      srvUser.removeUser(nUserId)
        .then(function () {
          $state.go('list');
        })
        .catch(function (oError) {
          vm.sError = oError;
        });
    };
  }
}
InfoController.$inject = ['$state', '$stateParams', 'srvUser', 'APP_SETTINGS'];
export default InfoController;
