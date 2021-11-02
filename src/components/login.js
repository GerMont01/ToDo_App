import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login(props) {
    const [ user, setUser ] = useState({
        email: "",
        password: ""
    });

    const [ message, setMessage ] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (localStorage.getItem("users")) {
            let users = JSON.parse(localStorage.getItem("users"));
            let findUser = users.find(x => x.email === user.email && x.password === user.password);
            if (findUser) {
                props.handleLogin(findUser)
            } else {
                setMessage("Invalid credentials")
            }
        } else {
            setMessage("Invalid credentials")
        }
    }
     return ( 
        <>
        {message ? (
            <h4>{message}</h4>
        ):(<></>)}
        <div className='login' onSubmit={(e)=>handleSubmit(e)}>
            <h1>Task Manager</h1>
            <form autoComplete='off'>
                <input type = "email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} required placeholder = "Enter your email"/>
                <input type = "password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  required placeholder = "Password"/>
                <button type = "Submit">Log in</button> 
                <Link to="/signup">Not registered? Sign up</Link>
            </form> 
        </div>
        </>
    );
}
export default Login;