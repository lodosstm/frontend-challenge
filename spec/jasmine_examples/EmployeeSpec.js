describe("Employee", () => {
  let Employee = require('../../src/js/class/Employee');
  let employee;

  beforeEach(() => {
    employee = new Employee(100, "photo.jpg", "Carla", "Radames", "position", ["react", "js", "sass"], "Female", "23.01.1974", "I'm the real Ada Wong");
  });

  it("First Name should be 'Ada'", () => {
    employee.setFirstName('Ada');
    expect(employee.firstName).toEqual('Ada');
  });
  it("Last Name should be 'Wong'", () => {
    employee.setLastName('Wong');
    expect(employee.lastName).toEqual('Wong');
  });
  it("dateOfBirthday shouldn't be null", () => {
    expect(employee.dateOfBirthday).toEqual(!null);
  });
  it("Gender should be 'Female'", () => {
    expect(employee.dateOfBirthday).toEqual('Female');
  });
});


