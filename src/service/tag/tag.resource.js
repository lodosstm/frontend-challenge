class Tag {
  constructor($resource, APP_SETTINGS) {
    this.$resource = $resource;
    this.endpoint = APP_SETTINGS.ENDPOINT;
  }

  /* Resource of tag*/
  tagResource() {
    return this.$resource(this.endpoint + '/tag', {}, {
      get: {
        method: 'GET',
        isArray: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      add: {
        method: 'POST',
        isArray: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    });
  }
}
Tag.$inject = ['$resource', 'APP_SETTINGS'];

export default Tag;
