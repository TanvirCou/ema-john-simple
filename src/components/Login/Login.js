import React, { useContext, useState } from 'react';
import './Login.css';
import { createUserWithEmailAndPass, handleGoogleSignIn, handleGoogleSignOut, initializeLoginFramework, resetPassword, signInWithEmailAndPass } from './LoginManager';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import fb from '../../images/fb.png';
import google from '../../images/google.png'
import { UserContext } from '../../App';

initializeLoginFramework();


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const[pass, setPass] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    // Form validation and give error

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    let pass1, pass2;

    const handleBlur = (e) => {
        let formValid = true;
        const newError = {...errors};

        if(e.target.name === 'firstName'){
            formValid = e.target.value.length > 2;
            if(!formValid){
                newError[e.target.name] = 'First name is not valid';
                setErrors(newError);
            }
            else{
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

        if(e.target.name === 'lastName'){
            formValid = e.target.value.length > 2;
            if(!formValid){
                newError[e.target.name] = 'Last name is not valid';
                setErrors(newError);
            }
            else{
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

        if (e.target.name === 'email') {
            formValid = /^\S+@\S+\.\S+$/.test(e.target.value);
            if(!formValid){
                newError[e.target.name] = 'Email is not valid';
                setErrors(newError);
            }
            else{
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 7;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            formValid = isPasswordValid && passwordHasNumber;

            pass1 = e.target.value;
            
            if(!formValid){
                newError[e.target.name] = 'Password is not valid';
                setErrors(newError);
            }
            else{
                newError[e.target.name] = '';
                setErrors(newError);
            }
            setPass(pass1);
         }   
            

        if(e.target.name === 'confirmPassword'){
            pass2 = e.target.value;
            
            if(pass !== pass2){
                newError[e.target.name] = 'Password is not matched';
                setErrors(newError);
            }
            else{
                newError[e.target.name] = '';
                setErrors(newError);
            }
        }
        

        if (formValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
		if (newUser && user.email && user.password) {
			createUserWithEmailAndPass(user.firstName, user.lastName, user.email, user.password)
                .then(res => {
                    handleResponse(res, false);
                    alert("Check your email for verification");
                    setNewUser(!newUser);
                })
		}
        if (!newUser && user.email && user.password) {
			signInWithEmailAndPass(user.email, user.password)
                .then(res => {
                    if(!res.emailVerified && res.email) {
                        res.error = '**A verification message was sent to your email.You can verify your email from there**';
                        res.success = false;
                        alert("Check your email for verification");
                        handleResponse(res, false);
                    }
                    if(res.emailVerified){
                        handleResponse(res, true);
                    }
                    if(!res.email){
                        handleResponse(res, false);
                    }
                })
		}
        e.preventDefault();   
    }

    const handleResponse = (res, doRedirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (doRedirect) {
            navigate(from, { replace: true });
         }
    }


    return (
                <div className="d-flex justify-content-center">
                    <div className='text-center mt-4 ml-5'>
                        <div className='account-info'>
                            {
                                !newUser &&
                                <div className='login-form border shadow p-3 bg-body rounded'>
                                    <h3 className='mb-3'>Login</h3>
                                    <form className='' onSubmit={handleSubmit}>
                                        <div className='d-flex justify-content-center form-group'>
                                            <input type="email" className='form-control' name="email" onBlur={handleBlur} placeholder='Username or Email' required />
                                            {errors.email.length > 0 &&  <p className="error-msg">{errors.email}</p>}  
                                        </div>
                                        <div className='d-flex justify-content-center form-group'>
                                            <input type="password" className='form-control' name="password" onBlur={handleBlur} placeholder='Password' required />
                                            {errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
                                        </div>
                                        <div className='text-left ml-3'>
                                            <button onClick={() => resetPassword(user.email)} className='underline-btn text-danger'>Forgot Password</button>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <input type="submit" value="Login" className='btn-login text-white' />
                                        </div>
                                    </form>
                                    <p>Don't have an account? <span><button onClick={() => setNewUser(!newUser)} className='underline-btn text-brand'>Create an account</button></span></p>
                                </div>
                            }


                            {
                                newUser &&
                                <div className='login-form border shadow p-3 bg-body rounded'>
                                    <h3 className='mb-3'>Create an account</h3>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group d-flex justify-content-center">
                                            <input type="text" className='form-control' name="firstName" onBlur={handleBlur} placeholder='First Name' required />
                                            {errors.firstName.length > 0 && <p className="error-msg">{errors.firstName}</p>}
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <input type="text" className='form-control' name="lastName" onBlur={handleBlur} placeholder='Last Name' required />
                                            {errors.lastName.length > 0 && <p className="error-msg">{errors.lastName}</p>}
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <input type="email" className='form-control' name="email" onBlur={handleBlur} placeholder='Username or Email' required />
                                            {errors.email.length > 0 && <p className="error-msg">{errors.email}</p>}
                                        </div>
                                        <div className='form-group d-flex justify-content-center'>
                                            <input type="password" className='form-control' name="password" onBlur={handleBlur} placeholder='Password' required />
                                            {errors.password.length > 0 && <p className="error-msg">{errors.password}</p>}
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <input type="password" className='form-control' name="confirmPassword" onBlur={handleBlur} placeholder='Confirm Password' required />
                                            {errors.confirmPassword.length > 0 && <p className="error-msg">{errors.confirmPassword}</p>}
                                        </div>
                                        <div className="from-group d-flex justify-content-center mt-4">
                                            <input type="submit" value="Create an account" className='btn-login text-white' />
                                        </div>
                                    </form>
                                    <p className='mt-3'>Already have an account?<span><button onClick={() => setNewUser(!newUser)} className='underline-btn text-brand'>Login</button></span></p>
                                </div>
                            }

                            <br />
                            <p className='text-danger text-center'>{loggedInUser.error}</p>
                            <div>
                                <h2 className="hr-lines">Or</h2>
                            </div>
                            <div className='social-part'>
                                {
                                    loggedInUser.isSignedIn ? <button onClick={googleSignOut} className='google-part text-center bg-white rounded-pill pt-2 pb-2'>
                                        Sign out
                                    </button> :
                                        <button onClick={googleSignIn} className='google-part bg-white rounded-pill text-left'>
                                            <img className='img-fluid m-1 mr-5' src={google} alt="" />
                                            Continue with Google
                                        </button>
                                }
                                <br />
                                <button className='fb-part bg-white rounded-pill text-left mt-2'>
                                    <img className='img-fluid m-1 mr-5' src={fb} alt="" />
                                    Continue with Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default Login;