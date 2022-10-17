import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {register} from "../../../actions/auth";
import {connect} from "react-redux";
import styles from "./Register.module.css";

const Register = ({register}: {register: any}) => {
  const [formData, updateFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpw: "",
    contact: "",
    dob: "",
  });

  const {name, email, password, confirmpw, contact, dob} = formData;
  //handler to change all fields
  const onChange = (e:any) =>updateFormData({
    ...formData,
    [e.target.name]:e.target.value,
  })
  //handler for submit any form
    const onSubmit = (e:any) => {
      e.preventDefault()
      if(password != confirmpw){
        console.log("Password must match")
      }else{
        //console.log(formData)
        register({name, email, password, confirmpw, contact, dob})
      }
    };
  

  
  return (
    <div className={styles.registerDiv}>
      <div className={styles.leftContentDiv}>
        <div className={styles.bgDiv} />
        
        <div className={styles.contentDiv}>
          <div className={styles.frameDiv}>
            <div className={styles.groupDiv}>
            
              <b className={styles.wELCOMEB}>WELCOME</b>
              <div className={styles.yourFavouriteSite}>
                Your favourite site
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightContentDiv}>
      <form onSubmit = {e => onSubmit(e)}>
      <Link className={styles.alreadyHaveAnAccountClick} to="/login">
        Already have an account, Click here!
      </Link>
        <input
          className={styles.passwordInput}
          type="text"
          placeholder="Password"
          minLength={4}
          name="password" 
          value={password} 
          onChange = {e => onChange(e)} 
          required
        />
        <input
          className={styles.nameInput}
          type="text"
          placeholder="Full Name"
          name="name" 
          value={name} 
          onChange = {e => onChange(e)} 
          required 
        />
        <input
          className={styles.dOBInput}
          type="text"
          placeholder="Date of Birth"
          name="dob" 
          value={dob} 
          onChange = {e => onChange(e)} 
          required
        />
        <input
          className={styles.contactInput}
          type="text"
          placeholder="Contact"
          name="contact" 
          value={contact} 
          onChange = {e => onChange(e)} 
          required 
        />
        <input
          className={styles.emailInput}
          type="text"
          placeholder="Email Address"
          name="email" 
          value={email} 
          onChange = {e => onChange(e)} 
          required
        />
        <input
          className={styles.confirmPasswordInput}
          type="text"
          placeholder="Confirm Password"
          minLength={4}
          name="confirmpw" 
          value={confirmpw} 
          onChange = {e => onChange(e)} 
          required
        />
        
        <button className={styles.button} type='submit' value='Register'>
          <div className={styles.placeholderDiv}>
            <div className={styles.registerDiv1}>Register</div>
          </div>
        </button>
        
        <div className={styles.titleDiv}>
          <h1 className={styles.helloH1}>Hello!</h1>
          <h2 className={styles.signUpToGetStarted}>Sign Up to Get Started</h2>
        </div>
        </form>
      </div>
    </div>
  );
};



export default connect(null, {register}) (Register);
