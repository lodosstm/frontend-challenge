import InfoModule from './info';
import InfoController from './info.controller';
import InfoComponent from './info.component';
import InfoTemplate from './info.html';

describe('Info', () => {
  let makeController;

  beforeEach(window.module(InfoModule));
  beforeEach(inject(() => {
    makeController = () => {
      return new InfoController();
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
      expect(InfoTemplate).to.match(/{{\s?infoCtrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = InfoComponent;

    it ('includes the intended template', () => {
      expect(component.template).to.equal(InfoTemplate);
    });

    it ('invokes the right controller', () => {
      expect(component.controller).to.equal(InfoController);
    });
  });
});