import React, { useContext, useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './Homepage.css';
import logo from '../../logos/Group 1329.png'
import { Link } from 'react-router-dom';
// import service from '../allService';
import Service from './Service';
import { UserContext } from '../../App';

const Homepage = (props) => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext) ;

    // loading data from Database - MongoDB primary
    const [ service , setService ] = useState([]) ;
    useEffect(()=> {
        fetch('http://localhost:5000/service')
        .then(res => res.json()
        .then(data => setService(data)))
    } , [])
    
    

    const handleBtnHelp = (service) => {     
        var newUser = {...loggedInUser};
        newUser.service = service.serviceName ;
        newUser.serviceImg = service.img ;
        setLoggedInUser(newUser)
    }


       
    


    return ( 
        <div className="container">

            <Navbar expand="lg">
            <Navbar.Brand href="/home">
                    <img src={logo} alt="" id="logo"/>
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" >

                        <Nav.Link href="/about" className="spacing">Learn about Doveloper</Nav.Link>
                        

                        <Link to="/logIn">
                        <Button variant="info" className="spacing" id="regBtn">Register</Button>
                        </Link>
                        
                        <Button variant="dark" href="/admin" className="spacing">Admin</Button>                                          
                                            
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <center> <h1 id="slogan"> I GROW BY HELPING PEOPLE IN NEED </h1></center>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
            {
                service.map(data=> 
                    (
                        
                           <Service data={data} handleBtnHelp={handleBtnHelp}></Service>
                        
                    ))
            }

            </div>


        </div>
    );
};

export default Homepage;