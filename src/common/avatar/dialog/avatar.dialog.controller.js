class AvatarDialogController {
  constructor($uibModalInstance, APP_SETTINGS, avatar) {
    let vm = this;
    vm.form = {};
    vm.currentAvatar = avatar;
    vm.defaultAvatar = APP_SETTINGS.AVATAR;
    vm.submitAvatar = () => {
      $uibModalInstance.close(vm.currentAvatar);
    };
    vm.fnCancel = () => {
      $uibModalInstance.$dismiss();
    };
  }

  set avatar(avatar) {
    this.currentAvatar = avatar;
  }

  get avatar() {
    return this.currentAvatar;
  }
}
AvatarDialogController.$inject = ['$uibModalInstance', 'APP_SETTINGS', 'avatar'];
export default AvatarDialogController;
