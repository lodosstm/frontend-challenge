import angular from 'angular';
import Tag from './tag.resource';
import TagService from './tag.factory';

const tagServiceModule = angular.module('tag.service', [])

  .service('Tag', Tag)
  .service('tagService', TagService);

export default tagServiceModule;
