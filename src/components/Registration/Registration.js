// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Input } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
// import ReactDatePicker from 'react-datepicker';
import DatePicker from 'react-datepicker';
import { UserContext } from '../../App';
import "./Registration.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom';

const Registration = () => {

    
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)


    const handleRegistration = (e) => {

        
        
        const descriptions = document.getElementById("description").value;
        let setDate = document.getElementById('date').value;

        
        
        const addDesript = {...loggedInUser};
        addDesript.description = descriptions;
        addDesript.date = setDate;

        var r = window.confirm("Press a button!");

        if ( r === true ) {
            setLoggedInUser(addDesript);
        }

        else {
            e.preventDefault() ;
        }

//         if (addDesript.description === "" && addDesript.date === "") {
           
//             setLoggedInUser(addDesript);
//         }
        
// else {
    
//     alert(` "Please Click the Submit registration button again to submit!!!" 
//     <br> <br> <hr>
    
//     ${addDesript.description} , ${addDesript.date}  `)

//     setLoggedInUser(addDesript);
    
   
// }
        
        

      

       

        console.log(loggedInUser);

       
        fetch('http://localhost:5000/volenteer/data' , {
            method : "POST" ,
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(loggedInUser)
        })

       
        // e.preventDefault()
    }

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16)
      );

    // row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 row-cols-xl-4
    return (
        <div className="container-fluid">
          <div className="row d-flex align-items-center box justify-content-center">
            <div className="col-6">
              <div className="inner-box align-items-center ">
                <div className="align-items-center in-box">
                <div >
                    <h3>Register as a Volunteer</h3>
                <Form >
                    <Form.Group >
                        <Form.Control type="text" placeholder={`Username : ${loggedInUser.userName}`} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Control type="text" placeholder={`E-mail : ${loggedInUser.userEmail}`} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Control type="text" placeholder={`Service Name : ${loggedInUser.service}`} />
                    </Form.Group>

                    <div className="row d-flex row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
                        <div className="col">
                        <h5 className="mr-auto">Set your Date</h5>
                        </div>
                        <div className="col">
                        <DatePicker
                        type="text"
                        selected={startDate}
                        id="date"
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        injectTimes={[
                            setHours(setMinutes(new Date(), 1), 0),
                            setHours(setMinutes(new Date(), 5), 12),
                            setHours(setMinutes(new Date(), 59), 23)
                        ]}
                        dateFormat="d MMMM, yyyy h:mm aa"
                    />
                        </div>

                    </div>
                    
            
                    <Form.Group >
                        <Form.Control
                         as="textarea" 
                         rows={3} 
                         id="description"
                         placeholder="Write About Your Experience About This service ..." required/>
                    </Form.Group>
                    
                    
                    <Link to="/client/dashboard" >
                    <Button variant="primary"  block onClick={()=>handleRegistration()}>
                        Confirm Your Registration
                    </Button>
                    </Link>
                </Form>
                </div>
            </div>
                </div>
              </div>
            </div>
          </div>
    );
};

export default Registration;