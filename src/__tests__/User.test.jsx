import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from '../User';

configure({ adapter: new Adapter() });


const user1 = {
	name: 'First',
	surname: 'Last',
	gender: 'Female',
	id: 1,
	skills: [
		"react",
		"node.js"
	],
	job: 'worker'
};


const user2 = {
	name: 'user',
	surname: 'test',
	gender: 'Male',
	id: 1,
	skills: [],
	job: ''
};


describe('<User />', () => {
	it('should render self for user1', () => {
		const renderedComponent = shallow(
			<User user={user1}/>
		);

		expect(renderedComponent.find('.User__fullName').text()).toBe('First Last');
		expect(renderedComponent.find('.User__job').text()).toBe('worker');
		expect(renderedComponent.find('.User__skill').length).toBe(2);
		expect(renderedComponent.find('.User__skills').childAt(0).text()).toBe('react');
	});

	it('should render self for user2', () => {
		const renderedComponent = shallow(
			<User user={user2}/>
		);

		expect(renderedComponent.find('.User__fullName').text()).toBe('user test');
		expect(renderedComponent.find('.User__job').exists()).toBe(false);
		expect(renderedComponent.find('.User__skill').length).toBe(0);
	});
});
