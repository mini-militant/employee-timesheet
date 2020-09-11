import React from "react";
import Table from "react-bootstrap/Table";
import "./UserData.css";
import Modal from "react-bootstrap/Modal";
import UserLoginDetails from "../UserLoginDetails";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

class UserDataDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      showModal: false,
      userId:null,
      date:new Date(),
      recordFound:false,
      currentActivity:{},
    };
    
  }

  componentDidMount() {
    fetch("https://run.mocky.io/v3/02f5bd14-b0db-4e8b-9aa1-d90176599e51")
      .then((res) => res.json())
      .then((res) => this.setState({ userData: res }));
  }

  showModal = (id) => {
    this.setState({ showModal: true,userId:id })    
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };


  storeDate=(date)=>{
    this.setState({date})
    const currentUserActivityPeriods = this.state.userData
              .filter(item=>item.id === this.state.userId)
              .map(item=> item.activity_periods)
               
    let recordFound = false
    let currentActivity = {}
    for(let i = 0; i< currentUserActivityPeriods[0].length; i++) {
      let activity = currentUserActivityPeriods[0][i]
      if (date.toString().substring(4,16) === activity.start_time.substring(0,12)) {
       recordFound=true
       currentActivity=activity
        break;  
      } else {
        recordFound=false
        }
    }
     this.setState({recordFound: recordFound, currentActivity: currentActivity}) 
                
  }

  render() {
    return (
      <div className="table-data-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userData.map((item, index) => {
              return (
                <tr key={item.id} onClick={()=>this.showModal(item.id)}>
                  <td>{index + 1}</td>
                  <td>{item.real_name}</td>
                  <td>{item.tz}</td>                  
                </tr>
              );
            })}
          </tbody>
        </Table>
        {
          this.state.showModal===true ?
          <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Body className="calendar-body">
          <h3>Hi, 
            { this.state.userData.filter(item=>item.id === this.state.userId).map(item=>item.real_name)}
          </h3>
            <Calendar onChange={(date)=>this.storeDate(date)} value={this.state.date} />            
            {
              this.state.recordFound === true ? 
                    <UserLoginDetails 
                      startTime={this.state.currentActivity.start_time.substring(12)} 
                      endTime={this.state.currentActivity.end_time.substring(12)}
                    />
                    :
                     <p className="no-record">No Record Found</p>                                       
            } 
              
          </Modal.Body>
        </Modal>
          :null        
        }
      </div>
    );
  }
}

export default UserDataDisplay;
