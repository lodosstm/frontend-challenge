class UserService {
  constructor($q, User) {
    this.$q = $q;
    this.rscUser = User.rscUser();
  }

  static userFactory($q, User) {
    return new UserService($q, User);
  }

  /* Fetch users*/
  getUsers() {
    let deferred = this.$q.defer();
    this.rscUser.getList({})
      .$promise
      .then(function (oResponse) {
        deferred.resolve(oResponse);
      })
      .catch(function () {
        deferred.reject('Error on users get');
      });

    return deferred.promise;
  }
  /* Fetch user by id*/
  getUser(nId) {
    let deferred = this.$q.defer();
    this.rscUser.getSingle({ id: nId })
      .$promise
      .then(function (oResponse) {
        deferred.resolve(oResponse);
      })
      .catch(function () {
        deferred.reject('Error on user get');
      });
    return deferred.promise;
  }
  /* Add user to store*/
  addUser(oUser) {
    let deferred = this.$q.defer();
    this.rscUser.add(JSON.stringify(oUser))
      .$promise
      .then(function (oResponse) {
        deferred.resolve(oResponse);
      })
      .catch(function () {
        deferred.reject('Error on user adding');
      });

    return deferred.promise;
  }
  /* Edit user*/
  editUser(oUser) {
    let deferred = this.$q.defer();
    this.rscUser.edit({ id: oUser.id }, JSON.stringify(oUser))
      .$promise
      .then(function (oResponse) {
        deferred.resolve(oResponse);
      })
      .catch(function () {
        deferred.reject('Error on users editing');
      });

    return deferred.promise;
  }
  /* Remove user by id*/
  removeUser(nId) {
    let deferred = this.$q.defer();
    this.rscUser.remove({ id: nId })
      .$promise
      .then(function (response) {
        deferred.resolve(response);
      })
      .catch(function () {
        deferred.reject('Error on users removing');
      });

    return deferred.promise;
  }
}
UserService.$inject = ['$q', 'User'];

export default UserService.userFactory;
