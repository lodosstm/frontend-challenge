import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'styles/index.scss';

import LeftElement from './components/LeftElement';
import RightElement from './components/RightElement';


const Routes = () => (
  <Router>
    <div>
			<div className="topElement">List</div>
			<div className="containerForUserListAndUserInfo">
				<LeftElement/>
				<RightElement/>
			</div>
    </div>
  </Router>
);

export default Routes;
