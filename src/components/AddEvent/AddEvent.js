import React from 'react';
import { Button } from 'react-bootstrap';
import './AddEvent.css'
import allService from '../allService'


const AddEvent = () => {

    
    const handleEvent = () => {
        fetch('http://localhost:5000/addService' , {
            method : 'POST' ,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(allService)
        })
    }


    return (
        <div>
            <h1>I am from add event page .</h1>
            <Button onClick={handleEvent}> Add Event </Button>
        </div>
    );
};

export default AddEvent;