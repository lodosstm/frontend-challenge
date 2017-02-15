import ListModule from './list';
import ListController from './list.controller';
import ListComponent from './list.component';
import ListTemplate from './list.html';

describe('List', () => {
  let makeController;

  beforeEach(window.module(ListModule));
  beforeEach(inject(() => {
    makeController = () => {
      return new ListController();
    };
  }));

  describe('Module', () => {
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = ListComponent;

    it('includes the intended template',() => {
      expect(component.template).to.equal(ListTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(ListController);
    });
  });
});