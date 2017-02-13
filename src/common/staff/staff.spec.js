import StaffModule from './staff';
import StaffController from './staff.controller';
import StaffComponent from './staff.component';
import StaffTemplate from './staff.html';

describe('Staff', () => {
  let makeController;

  beforeEach(window.module(StaffModule));
  beforeEach(inject(() => {
    makeController = () => {
      return new StaffController();
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
      expect(StaffTemplate).to.match(/{{\s?staffCtrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = StaffComponent;

    it ('includes the intended template', () => {
      expect(component.template).to.equal(StaffTemplate);
    });

    it ('invokes the right controller', () => {
      expect(component.controller).to.equal(StaffController);
    });
  });
});