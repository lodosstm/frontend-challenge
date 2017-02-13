class User {
  constructor($resource, APP_SETTINGS) {
    this.$resource = $resource;
    this.endpoint = APP_SETTINGS.ENDPOINT;
  }

  static userFactory($resource, APP_SETTINGS) {
    return new User($resource, APP_SETTINGS);
  }

  /* Resource of user*/
  rscUser() {
    return this.$resource(this.endpoint + '/user/:id', {}, {
      getSingle: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      getList: {
        method: 'GET',
        isArray: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      add: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      edit: {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      remove: {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    });
  }
}
User.$inject = ['$resource', 'APP_SETTINGS'];

export default User.userFactory;
