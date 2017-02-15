class UserService {
  constructor(User) {
    this.userResource = User.userResource();
  }

  /* Fetch users*/
  getUsers() {
    return this.userResource.getList({});
  }
  /* Fetch user by id*/
  getUser(id) {
    return this.userResource.getSingle({ id: id });
  }
  /* Add user to store*/
  addUser(user) {
    return this.userResource.add(JSON.stringify(user));
  }
  /* Edit user*/
  editUser(user) {
    return this.userResource.edit({ id: user.id }, JSON.stringify(user));
  }
  /* Remove user by id*/
  removeUser(id) {
    return this.userResource.remove({ id: id });
  }
}
UserService.$inject = ['User'];

export default UserService;
