import React, { useEffect, useState } from 'react';
import './ClientPage.css'

const ClientPage = () => {

    const [user , setUser ] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:5000/user')
        .then(res => res.json ())
        .then(data => setUser(data)) ;
    },[])
    return (
        <div>
            <h1>chech this out : </h1>
            {
                user.map(data => <li>name : {data.userName} ; service : {data.service} ; description : {data.description} ; date choosen : { data.date }</li>)
            }
        </div>
    );
};

export default ClientPage;