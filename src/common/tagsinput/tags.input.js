import angular from 'angular';
import tagsInputComponent from './tags.input.component';

const tagsInputModule = angular.module('tags.input', [
])
  .component('tagsInput', tagsInputComponent);

export default tagsInputModule;
