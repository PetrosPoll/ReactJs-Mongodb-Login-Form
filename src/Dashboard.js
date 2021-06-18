import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const Dashboard = (props) => {


    const [isLoggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/isAuth",
          }).then(response => {
            console.log("Inside useEffect");
        console.log(response.data);
        if(response.data) {
            setLoggedIn(true); 
          }else{
              console.log(props.history);
              props.history.push('/');
          }
        }).catch(error =>{
            console.log('error >>>>>>', error);
        });
  });

    const handleLogout = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:3001/logout",
          }).then(response => {
            if(response.data === "logout"){
            props.history.push('/');
            }
        }).catch(error =>{
            console.log('error >>>>>>', error);
        });
        
    }

   

    return(
        <div>
             Welcome User! <br/> <br/>
             <input
            type="button"
            value="Logout"
            onClick={handleLogout}
             ></input>
        </div>
    )
}

export default Dashboard;