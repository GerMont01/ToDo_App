import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Tasks from './components/tasks';
import { Button } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(()=>{ //Not doing this when login
    if (localStorage.getItem("users")){
      let storedUsers = JSON.parse(localStorage.getItem("users"));
      setUsers(storedUsers);
      if (localStorage.getItem("activeUser")){
        setCurrentUser(storedUsers.find(user=> user.email === JSON.parse(localStorage.getItem("activeUser")).email))  
      } 
    }
  },[])

  useEffect(() => {
    if (currentUser){
      localStorage.setItem("activeUser",JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("activeUser")
    }
  },[currentUser])
  
  const tasks = (tasks) => {
    let newUsers = users;
    newUsers = newUsers.map(user => {
      if (user.email === currentUser.email) {
          return user = {
              ...user,
              tasks
          }
      } else {
          return user;
      }
    });
    localStorage.setItem("users",JSON.stringify(newUsers))
    setUsers(newUsers);
  }

  const login = (user) => {
    setCurrentUser(user)
  }

  const signup = (user) => {
    if (users){
      let newUsers = users;
      newUsers.push(user);
      localStorage.setItem("users",JSON.stringify(newUsers))
    } else {
      localStorage.setItem("users",JSON.stringify([user]))
    }
    setCurrentUser(user);
  }

    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'> 
          {!currentUser ? (
            <Login handleLogin={login}/>
          ):(
            <>
            <Tasks user={currentUser} handleTasks={tasks}/>
            <Button className="logoutBtn" onClick={()=>setCurrentUser(undefined)}>Logout</Button>
            </>
          )}
          </Route>
          <Route path='/signup'>
            <Signup handleSignup={signup}/>
          </Route>
        </Switch>
      </BrowserRouter>
      </>
    );
}

export default App;
