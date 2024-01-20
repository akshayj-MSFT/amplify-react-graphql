import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

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
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary">
        <div className="p-3 bg-white w-25">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Enter Email" id="email" name="email" className="form-control" onChange={(event) => { setEmail(event.target.value); setIsAuthenticated("true");}}></input>                    
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" placeholder="Enter Password" id="pwd" name="pwd" className="form-control" onChange={(event) => { setPwd(event.target.value); setIsAuthenticated("true");}}></input>                    
                </div>
                <button className="btn btn-success">Login</button>
                {(isAuthenticated == "false")  ? <div className="text-danger">Incorrect Username or Password</div> : <div></div>}
            </form>
      </div>
    </div>
  );
}

export default Login;