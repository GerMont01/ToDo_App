import './signup.css';

import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';


export default function Signup(props) {

    const history = useHistory();

    const [ user, setUser ] = useState({
        name: "",
        email: "",
        password: "",
        tasks: []
    });
    const [ message, setMessage ] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            if (users.some(x => x.email === user.email)) {
                setMessage("User already exists")
            } else {
                props.handleSignup(user);
                history.push("/");
            }
        } else {
            props.handleSignup(user);
            history.push("/");
        }
    }
     return ( 
        <>
        {message ? (
            <h4>{message}</h4>
        ):(<></>)}
        <div className='login' onSubmit={(e)=>handleSubmit(e)}>
            <form autoComplete='off'>
                <input type = "text" value={user.name} onChange={(e)=>{setUser({...user,name:e.target.value})}} required placeholder = "Enter your name"/>
                <input type = "email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} required placeholder = "Enter your email"/>
                <input type = "password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  required placeholder = "Password"/>
                <button type = "Submit">Sign up</button> 
            </form> 
        </div>
        </>
    );
}
