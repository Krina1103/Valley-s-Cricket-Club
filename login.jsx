import React from 'react';
import ReactDOM from 'react-dom';

function Login(props){
    return <> 
    <h1 style={{marginTop:"100px"}}> Login Page of Valley's Cricket Club </h1> 
    <form>
        <label>Email ID</label>
        <input type="email" required />
        <label>Password</label>
        <input type="password" required />
        <button type="submit">Login</button>
    </form>
    </>
}

export default Login;