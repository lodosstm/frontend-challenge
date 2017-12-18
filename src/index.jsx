import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';

import App from './app';

ReactDOM.render(
	<AppContainer>
		<App/>
	</AppContainer>,
	document.getElementById('app')
);


