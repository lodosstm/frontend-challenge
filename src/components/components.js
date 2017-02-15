import angular from 'angular';
import List from './list/list';
import Add from './add/add';
import Edit from './edit/edit';
import Detail from './detail/detail';

export default angular.module('app.components', [
  List.name,
  Add.name,
  Edit.name,
  Detail.name
]);
