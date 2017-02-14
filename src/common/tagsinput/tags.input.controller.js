import _ from 'lodash';

class TagsIinputController {
  constructor($timeout, APP_SETTINGS, tagService) {
    let vm = this;
    vm.timeout = $timeout;
    vm.tagsLimit = APP_SETTINGS.MAX_TAG;
    vm.newTag = '';
    vm.isLoading = false;
    vm.isDisabled = false;
    vm.availableTags = [];

    /* Add tag to selected module tag*/
    vm.selectTag = (selectedTag) => {
      if (vm.tagsArray.length < vm.tagsLimit) {
        vm.tagsArray.push(selectedTag);
        vm.isLoading = false;
        vm.newTag = null;
      }
    };

    /* Get tag from server with name filter*/
    vm.fetchTags = () => {
      if (vm.newTag) {
        tagService.getTags({
          q: vm.newTag
        })
          .$promise
          .then((data) => {
            vm.availableTags = _.differenceBy(data, vm.tagsArray, 'name');
            vm.isLoading = vm.availableTags.length > 0;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    /* Remove the tag from selected list*/
    vm.removeTag = (index) => {
      vm.tagsArray.splice(index, 1);
    };

    /* Focus tag list if availableTags not empty*/
    vm.setFocus = () => {
      if (vm.availableTags.length > 0) {
        vm.isLoading = true;
      }
    };

    /* Blur tag list*/
    vm.setBlur = () => {
      $timeout(() => {
        vm.isLoading = false;
      }, 200);
    };

    /* WAIT USER KEYPRESS */
    document.addEventListener('keypress', (event) => {
      vm.timeout(() => {
        if ((vm.newTag)
          && (event.keyCode === 32 || event.keyCode === 13)) {
          tagService.addTag({ name: vm.newTag })
            .$promise
            .then(() => {
              vm.tagsArray = _.concat(vm.tagsArray, { name: vm.newTag });
              vm.newTag = '';
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 0);
    }, false);
  }

  get tags() {
    return this.tagsArray;
  }

  set tags(tagsArray) {
    this.tagsArray = tagsArray;
  }

  get disabled() {
    return this.isDisabled;
  }

  set disabled(isDisabled) {
    this.isDisabled = isDisabled;
  }

}
TagsIinputController.$inject = ['$timeout', 'APP_SETTINGS', 'tagService'];
export default TagsIinputController;
