import React from "react";
import './UserTimingDetail.css'

class UserLoginDetails extends React.Component {
  
  render() {
    console.log('props',this.props)
    return (
      <div className="usertiming-container">        
        <p className='timing-box-start'>
          <span className="time-in-out">IN-TIME</span>
          <span>{this.props.startTime}</span>
        </p>
        <p className='timing-box-end'>
          <span className="time-in-out">OUT-TIME</span>
          <span>{this.props.endTime}</span>
        </p> 
          
      </div>
    );
  }
}

export default UserLoginDetails;
