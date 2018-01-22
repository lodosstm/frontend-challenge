import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react'
import Header from '../components/Header.jsx'
import '../../assets/styles/App.scss';
import {Router} from './Router.jsx'
import { Provider } from 'react-redux';
import { store } from '../redux/store.js';
 export class Root extends React.Component {
   render() {
        return <MuiThemeProvider>
          <Header className='header'/>
        	<Provider store={store}>
            <Router />
     		</Provider> 
     	</MuiThemeProvider>  
      }
   }

export default Root;