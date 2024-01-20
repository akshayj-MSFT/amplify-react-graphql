import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import background from "./img/GregoryBackground.png";
import logo from "./img/GregoryIcon.png";

function Login() {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState("init");
  
  function handleSubmit(event) {
    event.preventDefault();
    //alert(email + ":" + pwd);
    //console.log(email + ":" + pwd);
    axios.post("http://localhost:3001/login", {email: email, password: pwd})
        .then(response => {
            console.log("Response data: " + response.data);            
            if (response.data == "Login Success!") 
            {
                setIsAuthenticated("true");
                navigate("/dashboard");
            }
            else setIsAuthenticated("false");
        })
        .catch(err => {
            console.log("Exception: " + err);
        })
  }

  const displayInfo = () => {
    console.log(email + ":" + pwd)
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="container-div w-25">
        <img src={logo} alt="Gregory Logo" style={{ alignSelf: 'center' }}  />            
            <div className="p-3 bg-secondary" >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter Email" id="email" name="email" className="form-control" onChange={(event) => { setEmail(event.target.value); setIsAuthenticated("true");}}></input>                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" placeholder="Enter Password" id="pwd" name="pwd" className="form-control" onChange={(event) => { setPwd(event.target.value); setIsAuthenticated("true");}}></input>                    
                    </div>
                    <button className="btn btn-primary">Login</button>
                    {(isAuthenticated == "false")  ? <div className="text-warning">Incorrect Username or Password</div> : <div></div>}
                </form>
            </div>
      </div>      
    </div>
  );
}

export default Login;