import React  from 'react';
import Paper from 'material-ui/Paper';
export default class Header extends React.Component {

render() {
  return	<Paper className='header'  zDepth={2} >
              <div className='header_title'>List</div>
            </Paper>
        }
    }