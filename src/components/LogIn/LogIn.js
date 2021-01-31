import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from '../../firebase.config';
import "./LogIn.css"
import { Col, Row , Button } from 'react-bootstrap';

firebase.initializeApp(firebaseConfig)

const LogIn = () => {

    const [loggedInUser , setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [newUser , setNewUser] = useState(false) ;

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = (e) => {
        firebase.auth().signInWithPopup(provider)
        .then(res=> {

            var {displayName , photoURL , email} = res.user;
            const newUserInfo = {...loggedInUser};
            newUserInfo.userName = displayName
            newUserInfo.userEmail =email
            newUserInfo.error = "";
            newUserInfo.isSignedIn = true;
            newUserInfo.success= true;
            newUserInfo.userPhoto = photoURL ;

            setLoggedInUser(newUserInfo);
            history.replace(from);
            // ...
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;

            console.log(email , errorCode , errorMessage)

          });

        e.preventDefault();

    }



    const handleSignOut = (e) => {
      firebase.auth().signOut()
      .then(function() {
          // Sign-out successful.
          const signedOutUser = {
              isSignedIn : false,
              name : '',
              email : '' ,
              photo : '',
          }
          // setUser(signedOutUser);
          setLoggedInUser(signedOutUser);
          
        })
        .catch(function(error) {
          // An error happened.
          console.log(error)
        });

      e.preventDefault();

        
      }

      console.log(loggedInUser)


    return (
        <div className=" container-fluid">

          <div className="row d-flex align-items-center box justify-content-center">
            <div className="col-6">
              <div className="inner-box align-items-center ">
                <div className="align-items-center in-box">
                <h1>Login With </h1>
                <Button variant="outline-dark">Continue with Google</Button>
                <div className="signInWithPopUp">
            {   
                loggedInUser.isSignedIn 
                ?<Button variant="outline-warning" onClick={handleSignOut}> 
                
                Sign Out From Google 
                </Button>
                :<Button variant="outline-warning"  onClick={handleSignIn}>Sign  
                {
                    newUser
                    ? ' Up '
                    : ' In '
                }
                With Google </Button>
            }
        </div>
                </div>
              </div>
            </div>
          </div>



        </div>
    );
};

export default LogIn;