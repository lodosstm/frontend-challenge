import React  from 'react';
import { NavLink } from 'react-router-dom'
import Main from '../containers/Main.jsx'
import IconButton from 'material-ui/IconButton';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import '../../assets/styles/App.scss';
export default class AddButton extends React.Component {
constructor(props) {
      super(props);

    this.state = {
       opacity: 1,
    };
  }
  handleClick() {
  
  }
render() {
const activeStyle = {
paddingTop:"33px", 
paddingBottom:"7px",  
paddingRight:"221px", 
paddingLeft:"221px", 
zIndex: 5, 
opacity: 0.99, 
fontWeight:"bold",
backgroundColor:"#FAFAFA"
}
const styles = {
    width: 33,
    height: 33,
    color: '#90727c'
  };
  const style = {
  padding: '21px',
  backgroundColor:"blue"
  }
		return	<div>
            <div className='add'>
        <NavLink exact to="/add"  activeStyle={activeStyle}>
         <IconButton iconStyle={styles}><AddCircleOutline className='add_icon' /></IconButton>
          </NavLink>
          </div>
          <Main />
        </div>
        {this.props.children}
        }
    }
