import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/index.scss';
import UserList from './UserList';
import UserInfo from './UserInfo';
import CreateUser from './CreateUser';
import EditUser from './EditUser';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.refreshList = this.refreshList.bind(this);
	}

	refreshList(){
		this.setState({refreshList:new Date()});
	}


	render() {
		return (
			<Router>
				<div>
					<div className="topElement">List</div>
					<div className="containerForUserListAndInfo">
						<UserList refreshList={this.state.refreshList}/>
						<Switch>
							<Route path="/new" exact component={({history}) =>
								<CreateUser refreshList={this.refreshList} history={history}/>
							}/>
							<Route path="/edit/:userId?" component={({match})=>
									!isNaN(match.params.userId)?<EditUser userId={match.params.userId} refreshList={this.refreshList}/>:''
							}/>
							<Route path="/:userId?" component={({match})=>
									!isNaN(match.params.userId)?<UserInfo userId={match.params.userId} refreshList={this.refreshList}/>:''
							}/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}



export default App;
