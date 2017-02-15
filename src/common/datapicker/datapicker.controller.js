class DatePickerController {
  constructor($timeout, $filter) {
    let vm = this;
    vm.isLoading = false;
    vm.active = false;
    vm.inputPlaceholder = 'Input date';
    this.$filter = $filter;
  }

  set date(date) {
    this.selectedDate = date;
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
