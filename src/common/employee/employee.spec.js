import EmployeeModule from './employee';
import EmployeeController from './employee.controller';
import EmployeeComponent from './employee.component';
import EmployeeTemplate from './employee.html';

describe('Employee', () => {
  let controller;

  beforeEach(window.module(EmployeeModule));
  beforeEach(inject((_$controller_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    controller = _$controller_;
  }));

  describe('Controller', () => {
    // controller specs
    it ('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = EmployeeComponent;

    it ('includes the intended template', () => {
      expect(component.template).to.equal(EmployeeTemplate);
    });

    it ('invokes the right controller', () => {
      expect(component.controller).to.equal(EmployeeController);
    });
  });
});