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
    };
    this.error=true
    
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
            <Calendar onChange={(date)=>this.setState({date})} value={this.state.date} />            
            {
              this.state.userData.filter(item=>item.id === this.state.userId)
              .map(item=> item.activity_periods
                .map(activity=>                  
                  this.state.date.toString().substring(4,16) === activity.start_time.substring(0,12)
                    ?   
                    (
                      <>
                    {this.error=!this.error }                          
                    <UserLoginDetails 
                      startTime={activity.start_time.substring(12)} 
                      endTime={activity.end_time.substring(12)}
                    />
                    </>
                    )
                     :
                    null                               
                ))              
            } 
                {
                  this.error === true ? <p className="no-record">No Record Found</p> : null
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
