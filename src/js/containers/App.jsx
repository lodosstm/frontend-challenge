import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React  from 'react'
import AddButton from '../components/AddButton.jsx'
export default class App extends React.Component {
render() {
    
    return <MuiThemeProvider>

        <AddButton  />
        

		</MuiThemeProvider>
  }
}