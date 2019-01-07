import React from 'react'
import App from './App.jsx'
import Add from './Add.jsx'
import '../../assets/styles/App.scss';
import EmployeeContainer from './EmployeeContainer.jsx'
import { BrowserRouter, Route} from 'react-router-dom'
 export class Router extends React.Component {
   render() {
        return <BrowserRouter >
  					<div class='root'>
              <Route path='/' component={App} />
    					<Route path='/add' component={Add} />
    					<Route path='/employee/:id' render={(routeProps) => (<EmployeeContainer {...this.props } {...routeProps}/>)} />
    				</div>
  				</BrowserRouter>
      }
   }
