import React  from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import '../../assets/styles/App.scss';
import '../../assets/styles/EmployeeInfo.scss';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';

export class EmployeeComponent extends React.Component {
  render() {
          const styles = { width: 33, height: 33, color: '#90727c'};
          return <div className='page'>
          <div className='close'><HighlightOff style={styles} onClick={this.props.onClose}/></div>
          <div className='info'>
          <img className='photo' src={this.props.photo} width='73px' height='73px' />
          <div className='info_employee'>
          <span className='info_name'>{this.props.firstName}</span>
          <span className='info_name'>{this.props.lastName}</span>
          <span className='info_data'>({this.props.gender}, {this.props.dateOfBirthday})</span>
          <div className='info_position'>{this.props.position}</div>
          <div  className='info_skills'>{this.props.skills.map((item, index)=> {
                return <span className='info_skill' key={index}>{item}</span>})}</div>
          </div>
          </div>
          <div className='info_qualification'>{this.props.qualification}</div>
          <div className='info'>
          <button className='change' onClick={this.props.toChange.bind(this, null)}>Edit data</button>
          <button className='delete' onClick={this.props.toDelete}>Delete user</button>
          </div>
          </div>
        }
    }