import { Checkbox, Container, CssBaseline, FormControlLabel, Link, makeStyles, TextField, Typography , Button , Avatar } from '@material-ui/core';
import firebase from 'firebase';
import React, { useContext, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import firebaseConfig from '../../firebase.config';
import './LogIn.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'; 



firebase.initializeApp(firebaseConfig)

const LogIn = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext)

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [newUser , setNewUser] = useState(false)


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

    const handleSubmit = (e) => {

        if (newUser) {
            const formEmail = document.getElementById('formEmail').value
            const formPass = document.getElementById('formPass').value
            const formName = document.getElementById('formName').value


    
            firebase.auth().createUserWithEmailAndPassword(formEmail, formPass)
            .then( res=> {
                const newUserInfo = {...loggedInUser};
                
//------------------
                var user = firebase.auth().currentUser;

                    user.updateProfile({
                    displayName: formName,
                    }).then(function() {
                    // Update successful.
                    }).catch(function(error) {
                    // An error happened.
                    });

//----------------------------                    
                newUserInfo.error = "";
                newUserInfo.success= true;
                newUserInfo.userName = formName ; // check it again if it works
                // updateUserName(formName);
                newUserInfo.userEmail = formEmail;
                
                setLoggedInUser(newUserInfo)
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // const newUserInfo = {...user};
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo)
                
    
                // ...
              });
        }

        if(!newUser) {
            const formEmail = document.getElementById('formEmail').value
            const formPass = document.getElementById('formPass').value

            firebase.auth().signInWithEmailAndPassword(formEmail, formPass)
            .then(res=>{
                const newUserInfo = {...loggedInUser};
                newUserInfo.userName = res.user.displayName
                newUserInfo.userEmail = res.user.email
                newUserInfo.error = "";
                newUserInfo.success= true;
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                const newUserInfo = {...loggedInUser};
                newUserInfo.error = errorMessage;
                newUserInfo.success = false;
                setLoggedInUser(newUserInfo)
              });
        }
        
        e.preventDefault();
        

    }
    // console.log(loggedInUser)


    //------------------------------------------------------------ Metarial UI code inject


    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
      
      const classes = useStyles();

console.log(loggedInUser)
    
    return (
        <div>
        <div>       
            {/* <div className="form-section">
                <h1 id="">
                {
                !newUser 
                    ? "Log In"
                    : "Create an account "
                }
                </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>

                    {
                        newUser &&
                    <div>
                        <Form.Label>Create a Username</Form.Label>
                        <Form.Control type="text" id="formName" placeholder="Type Your Name Here" />
                    </div>
                    
                    }
                    <Form.Label>
                        {
                            !newUser 
                            ? "Enter Your Email Address"
                            : "Your E-mail address "
                        }
                    </Form.Label>
                    <Form.Control type="email" name="email" placeholder="E-mail address"
                    id="formEmail" required/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                    {
                        !newUser 
                        ? "Enter Your Password"
                        : "Create a strong password"
                    }
                    </Form.Label>
                    <Form.Control type="password" name="password" placeholder={
                        !newUser 
                        ? "Password"
                        : "Minimum 6 charecter"
                    } id="formPass" required/>
                    </Form.Group>
                    <Form.Group > 
                {
                        !newUser 
                        ? <p id="slogan">I Don't have any account</p>
                        : <p id="slogan">Already have an account</p>
                    }
                    <Form.Check type="checkbox"  name="newUser" onChange={()=>setNewUser(!newUser) } label={
                        !newUser 
                        ? "Create a new Account !!"
                        : "Log In Now !!"
                    } />
                </Form.Group>
                <Button variant="outline-success" className="btn-block" type="submit">
                    { newUser ? "Sign Up" : "Sign In" }
                </Button>
                
            </Form>

            {
                loggedInUser.success 
                ? <p style={{color : "green"}}> Successfully {newUser ? 'Created' : "Logged In"}</p>
                :<p style={{color : "red"}}> {loggedInUser.error}</p>
                
            }
        </div> */}
            
        {/* <div className="signInWithPopUp">
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
        </div>   */}
    </div>


    {/* ------------------------------ Metarial UI Form making---------------------------------  */}



    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          {/*------- button ------ */}

          {   
                loggedInUser.isSignedIn 
                ?<Button variant="outline-warning" 
                type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
                onClick={handleSignOut}> 
                
                Sign Out From Google 
                </Button>
                :<Button variant="outline-warning" 
                type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
              onClick={handleSignIn}>Sign  
                {
                    newUser
                    ? ' Up '
                    : ' In '
                }
                With Google </Button>
            }

            {/*------- button ------ */}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>



    </div>
    );
};

export default LogIn2;