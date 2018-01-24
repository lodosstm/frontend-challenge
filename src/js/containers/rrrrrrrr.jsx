import React from 'react'
import App from './App.jsx'
import Add from './Add.jsx'
import '../../assets/styles/App.scss';
import EmployeeContainer from '../components/EmployeeComponent.jsx'
import { BrowserRouter, Route} from 'react-router-dom'
 export class Router extends React.Component {
   render() {
  					<div class='root'>
    					<Route path='/add' component={Add} />
    					<Route path='/employee/:id' render={(routeProps) => (<EmployeeComponent {...this.props } {...routeProps}/>)} />
    				</div>
      }
   }
