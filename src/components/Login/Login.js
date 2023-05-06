
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPass, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, signInWithEmailAndPass } from './LoginManager';

initializeLoginFramework();

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'

  

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const googleSignOut = () => {
    handleGoogleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const handleBlur = (e) => {
      let formValid = true;
      if(e.target.name === 'email'){
        formValid = /^\S+@\S+\.\S+$/.test(e.target.value);
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 7;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        formValid = isPasswordValid && passwordHasNumber;
      }
      if(formValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }
  }
 const handleSubmit = (e) => {
  if(newUser && user.email && user.password){
    createUserWithEmailAndPass(user.name, user.email, user.password)
    .then(res => {
      handleResponse(res, true);
    })
  }
  if(!newUser && user.email && user.password){
    signInWithEmailAndPass(user.email, user.password)
    .then(res => {
      handleResponse(res, true);
    })
  }
  e.preventDefault();
 }
  
  const handleResponse = (res, doRedirect) => {
      setUser(res);
      setLoggedInUser(res);
      if(doRedirect){
        navigate(from, {replace: true});
      }
      
  }


  return (
    <div>
      {
        user.isSignedIn ? <button onClick={googleSignOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      }

      <h1>Our own authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New user sign up</label>
      <br />
      <form onSubmit={handleSubmit}>
        {
        newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='Name'/>
        }
        <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder='Your Email Address' required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder='Your Password' required />
        <br />
        <input type="submit" value="Sign in" />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>Sign {newUser ? 'up' : 'in'} successfully complete</p>
      }
    </div>
  );
};

export default Login;
