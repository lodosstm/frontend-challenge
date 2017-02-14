class TagService {
  constructor(Tag) {
    this.tagResource = Tag.tagResource();
  }

  /* Fetch tags*/
  getTags(parameters) {
    return this.tagResource.get(parameters);
  }

  /* Add tags to store*/
  addTag(tag) {
    return this.tagResource.add(JSON.stringify(tag));
  }
}
TagService.$inject = ['Tag'];

export default TagService;
