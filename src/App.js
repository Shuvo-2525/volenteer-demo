import React, { createContext, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
import ClientPage from './components/ClientPage/ClientPage';
import LogIn from './components/LogIn/LogIn';
import AdminPage from './components/AdminPage/AdminPage';
import AddEvent from './components/AddEvent/AddEvent';
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";
import AboutDev from "./components/AboutDev/AboutDev";
import NotFound from "./components/NotFound/NotFound";
import Registration from "./components/Registration/Registration";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {

  const [loggedInUser , setLoggedInUser ] = useState({
      userName : "",
      userPhoto : "",
      userEmail : "",
      service : "",
      serviceImg : "" ,
      isSignedIn : false ,
      error : '',
      success : false ,
      admin : '',
      date: "",
      description: ''
    })
  return (
    <UserContext.Provider value = {[loggedInUser , setLoggedInUser]}>
    <Router>

      <Switch>
        
            <Route exact path="/">
              <Homepage></Homepage>
            </Route> 
            <Route path="/home">
              <Homepage></Homepage>
            </Route>
            <Route path="/about">
              <AboutDev></AboutDev>
            </Route>
            <Route path="/logIn">
              <LogIn></LogIn>
            </Route>
            <PrivateRoute path="/client/registration">
              <Registration></Registration>
            </PrivateRoute>
            <Route path="/client/dashboard">
              <ClientPage></ClientPage>
            </Route>
            <Route path="/admin/dashboard">
              <AdminPage></AdminPage>
            </Route>
            <Route path="/admin/addEvents">
              <AddEvent></AddEvent>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          
      </Switch>

      
    </Router>
    </UserContext.Provider>
  );
}

export default App;
