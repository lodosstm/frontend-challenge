import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserList from '../UserList';
import User from '../User';


configure({ adapter: new Adapter() });


beforeEach(function() {
	global.fetch = jest.fn(() => new Promise(resolve => resolve()));
});


describe('<UserList />', () => {

	it('should render loading without user', () => {
		const renderedComponent = shallow(
			<UserList />
		);
		renderedComponent.setState({loading: true});

		expect(renderedComponent.find('.UserList__items').childAt(0).text()).toBe('Loading');
		expect(renderedComponent.find('.UserList__items li').exists()).toBe(false);
	});

	it('should render two users', () => {
		const renderedComponent = shallow(
			<UserList/>
		);
		renderedComponent.setState({
			loading: false,
			users: [{id: 0},	{id: 1}]
		});

		expect(renderedComponent.find('.UserList__items div').exists()).toBe(false);
		expect(renderedComponent.find(User).length).toBe(2);
	});
});



