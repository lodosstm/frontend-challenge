class DatePickerController {
  constructor($timeout, $filter) {
    let vm = this;
    vm.isLoading = false;
    vm.active = false;
    vm.inputPlaceholder = 'Input date';
    this.$filter = $filter;
    vm.setFocus = () => {
      $timeout(() => {
        vm.active = true;
      }, 200);
    };
    vm.setBlur = () => {
      $timeout(() => {
        vm.selectedDate = $filter('date')(vm.selectedDate, 'dd MMM yyyy');
        vm.active = false;
      }, 100);
    };
  }

  set date(date) {
    this.selectedDate = this.$filter('date')(date, 'dd MMM yyyy');
  }

  get date() {
    return this.selectedDate;
  }

  set placeholder(placeholder) {
    this.inputPlaceholder = placeholder;
  }

  get placeholder() {
    return this.inputPlaceholder;
  }

}
DatePickerController.$inject = ['$timeout', '$filter'];

export default DatePickerController;
