import './App.css';
import Login from "./Login";
import React from 'react';


function App() {

  return (
    <div className="App">
      {/*<div className="information">
        <label htmlFor="email">Login:</label>
        <input 
          type="email" placeholder="Enter Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
         />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" placeholder="Enter Password"
          onChange={(event) => {
            setPwd(event.target.value);
          }}
          >
        </input>
        <button>Login</button>        
        <button onClick={displayInfo}>Debug</button>
      </div>*/}
      
      <Login />      
    </div>
  );
}

export default App;