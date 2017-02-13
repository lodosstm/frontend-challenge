import EmployeeModule from './employee';
import EmployeeController from './employee.controller';
import EmployeeComponent from './employee.component';
import EmployeeTemplate from './employee.html';

describe('Employee', () => {
  let makeController;

  beforeEach(window.module(EmployeeModule));
  beforeEach(inject(() => {
    makeController = () => {
      return new EmployeeController();
    };
  }));

  describe('Controller', () => {
    // controller specs
    it ('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it ('has name in template [REMOVE]', () => {
      expect(EmployeeTemplate).to.match(/{{\s?emplCtrl\.name\s?}}/g);
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