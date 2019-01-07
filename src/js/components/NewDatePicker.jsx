import React  from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
export default class NewDatePicker extends React.Component {


	render() {

    let overwrites = {
    "palette": {
        "primary1Color": "#FF9800",
        "primary2Color": "#FFF3E0",
   },
    "datePicker": {
      "headerColor": "#FF9800",
      "primary1Color": "#FF9800",
        "selectColor": "#FF9800",
        "color":"#FF9800",
        "calendarTextColor": "#FFF3E0"
    }
  }

		return	<MuiThemeProvider muiTheme={getMuiTheme(overwrites)}>
      <DatePicker className='select select_date'
              hintStyle={{color: '#fff'}}
              hintText="Birthday"
              value={this.props.dateOfBirthday}
              underlineStyle={{borderBottom: 'none',
                }}
              maxDate={this.props.maxDate}
              onChange={this.props.handleChangeDate}
              formatDate={this.props.formatDate}
              openToYearSelection='true'
              locale="fr">
              <KeyboardArrowDown style={{color: "#fffff", width: 24, height: 24, marginLeft: '130px', marginTop: '4.5%'}}/>
            </DatePicker>
      </MuiThemeProvider>
        }
    }
