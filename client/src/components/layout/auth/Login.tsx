import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from "../../../actions/auth";
import styles from "./Login.module.css";

const Login = ({login, isAuthenticated}:{login:any, isAuthenticated:any}) => {
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData;

  const onChange = (e:any) =>
    updateFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  const onSubmit = (e:any) => {
    e.preventDefault();
    
    login({email, password})
  };

//redirect when logged in
  if(isAuthenticated){
    return <Navigate to="/welcome"/>


  }
  return (
    <div className={styles.loginFrameDiv}>
      <div className={styles.loginDiv}>
        <div className={styles.rightContentDiv}>
		<form onSubmit={(e) => onSubmit(e)}>
          <Link className={styles.dontHaveAccountYetClick} to="/register">
            Don’t have account yet? Click Here!
          </Link>
          <a className={styles.forgotPassword}>
            Forgot Password
          </a>
          <button className={styles.button} type="submit" value="Login">
            <div className={styles.placeholderDiv}>
              <div className={styles.loginDiv1}>Login</div>
            </div>
          </button>
          <div className={styles.checkboxWithTextDiv}>
            <div className={styles.checkboxDefaultDiv}>
              <label className={styles.textLabel}>Remember me</label>
              <input
                className={styles.checkboxDefaultInput}
                type="checkbox"
                required
              />
            </div>
          </div>
          <input
            className={styles.passwordInput}
            type="password"
            name="password"
            placeholder="Password"
            minLength={4}
            value={password}
		        onChange={e => onChange(e)}
            required
          />
          <input
            className={styles.emailInput}
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
		        onChange={e => onChange(e)} 
            required
          />
          <div className={styles.titleDiv}>
            <div className={styles.welcomeBackDiv}>Welcome Back</div>
            <b className={styles.helloAgainB}>Hello Again!</b>
          </div>
		</form>
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = (state:any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,{login})(Login);
