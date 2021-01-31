import React from 'react';
import { Button, Card, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Service = (props) => {
    return (
        <div>
             <Card style={{ width: '18rem' , height: '450px' , padding: '15px' , border : '1px solid transparent'}}>
                <Card.Img variant="top" src={props.data.img} />
                    <Card.Body>
                        <center>
                        <Card.Title>{props.data.serviceName}</Card.Title>
                        <Link to="/client/registration">
                            <Button variant="primary" onClick={() => props.handleBtnHelp(props.data)}>Start helping</Button>
                        </Link>
                        </center>
                    </Card.Body>
            </Card>
        </div>
    );
};

export default Service;