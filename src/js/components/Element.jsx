import React  from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar';
import '../../assets/styles/App.scss';
import Employee from '../class/Employee.js';

export class Element extends React.Component {


profileFilledStyle = () => {
    const employee = new Employee(this.props.id, this.props.photo, this.props.firstName, this.props.lastName, this.props.position, this.props.skills, this.props.gender, this.props.dateOfBirthday, this.props.qualification);
    let filledProfile = employee.getFilledProfile();
    let max = `hsl(${filledProfile / 100 * (120 - 0)}, 100%, 60%)`;
    let min = `hsl(${filledProfile / 100 * (120 - 0)}, 100%, 30%)`;
    let gradient = `linear-gradient(to top, ${max}, ${min})`;
    return {background: gradient, top: `calc(100% - ${filledProfile}%)`, height: `calc(${filledProfile}%)`}
  }

  render() {
          const employee = new Employee(this.props.id, this.props.photo, this.props.firstName, this.props.lastName, this.props.position, this.props.skills, this.props.gender, this.props.dateOfBirthday, this.props.qualification);
          let filledPercentage = employee.getFilledProfile();
          console.log("filledPercentage: ", filledPercentage);

          return <div className='element'>
          <div className='element_indecator'><div className='element_indecator_line' style={this.profileFilledStyle()}></div></div>
          <div className='element_avatar'><Avatar src={employee.photo} size={73} /></div>
          <div className='element_data'>
          <div className='name'>
          <span className='name_firstName' >{employee.firstName}</span>
          <span>{employee.lastName}</span>
          </div>
          <div className='position'>{employee.position}</div>
          <div className='skills'>{employee.skills.map((item, index)=> {
                return <div className='skill' key={index}>{item}</div>})}</div>
          </div>
          </div>
        
        }
    }