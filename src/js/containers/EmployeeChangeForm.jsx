import React  from 'react'
import Form from '../components/Form.jsx';
import '../../assets/styles/App.scss';
export class EmployeeChangeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
                  id: this.props.employee.id,
                  photo: this.props.employee.photo,
                  firstName: this.props.employee.firstName, 
                  lastName: this.props.employee.lastName, 
                  status: this.props.employee.position,
                  skills: this.props.employee.skills,
                  gender: this.props.employee.gender,
                  dateOfBirthday: this.props.employee.dateOfBirthday,
                  qualification: this.props.employee.qualification
                }
  }
  
  render() {
    return <Form id={this.state.id} photo={this.state.photo} firstName={this.state.firstName} lastName={this.state.lastName}  position={this.state.position}  skills={this.state.skills}  gender={this.state.gender}  dateOfBirthday={this.state.dateOfBirthday} qualification={this.state.qualification} closeForm={this.props.onClose} onSave={this.props.onSave} />
            
  }
}