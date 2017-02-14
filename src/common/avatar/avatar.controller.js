import modalTemplate from './dialog/modal-form.html';
import modalController from './dialog/avatar.dialog.controller';

class AvatarModalController {
  constructor($uibModal, APP_SETTINGS) {
    let vm = this;
    vm.currentAvatar = '';
    vm.defaultAvatar = APP_SETTINGS.AVATAR;

    vm.openModal = () => {
      let modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        template: modalTemplate,
        controller: modalController,
        controllerAs: 'avatarDialogCtrl',
        resolve: {
          avatar: () => {
            return vm.currentAvatar;
          }
        }
      });
      modalInstance.result.then((newAvatar) => {
        vm.currentAvatar = newAvatar;
      });
    };
  }

  set avatar(avatar) {
    this.currentAvatar = avatar;
  }

  get avatar() {
    return this.currentAvatar;
  }
}
AvatarModalController.$inject = ['$uibModal', 'APP_SETTINGS'];

export default AvatarModalController;
