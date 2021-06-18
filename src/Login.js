import React, { useState } from 'react';
import axios from 'axios';



const Login = (props) => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const handlelogin = () =>{
        // props.history.push('/dashboard');

        axios({
            method: "POST",
            withCredentials: true,
            data: {
                username: username, 
                password: password, 
            },
            url: "http://localhost:3001/getdata",
          }).then(response => {
            console.log("When clicked handlelogin");
            setLoading(false);
            if(response.data.message === "Success") {
                props.history.push("/Dashboard");                 
            } else if(response.data.message === "Failure"){
                props.history.push('/');
            }else{
                console.log("F");
            }
            console.log('response >>>>>>>>>>', response.data);
        }).catch(error =>{
            setLoading(false);
            if(error.message.status === 401 || error.message.status === 400){
                setError(error.response.data.message);
            }
            else{
                setError("Something went wrong. Please try again later.");
            }
            console.log('error >>>>>>', error);
        });

    }

    return (
        <form>
          <h1>Login</h1>
    
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required />
          </label>
          
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required />
          </label>
          <button type="button" onClick={handlelogin}>Submit</button>
        </form>
      );
}

export default Login;
