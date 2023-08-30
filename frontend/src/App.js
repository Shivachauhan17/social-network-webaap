import React, { useState, useEffect } from "react";
import LoginSignup from './components/signup_login_page'

function App() {
  const [homeres, setHomeres] = useState("");
  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => {
        setHomeres(data)})
      .catch(err=>{
        console.log(err)
      })
  }, []);

  console.log("the data is:",homeres)
  return (
    <div className="App">
      <LoginSignup loginUrl={homeres.loginUrl} signupUrl={homeres.signupUrl} 
      button1={homeres.button1} button2={homeres.button2} 
      bootclass1={"btn btn-outline-primary"} bootclass2={"btn btn-outline-success"}/>
    </div>
  );
}

export default App;