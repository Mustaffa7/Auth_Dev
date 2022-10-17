import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {logout} from "../../actions/auth";

const Navbar = ({auth: {isAuthenticated, loading}, logout}:{auth: {isAuthenticated:any, loading:any}, logout:any}) => {
    const authLinks =(
        <ul>
            <li>
                <a onClick = {logout} href='#!'>
                    Logout
                </a>
            </li>
        </ul>
    );
    const guestLinks =(
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
  return (
    <nav>
        <h1>
            <Link to="/">Mern Auth</Link>
        </h1>
        {!loading && (<div>{isAuthenticated ? authLinks : guestLinks}</div>)}
    </nav>
    );
};

const mapStateToProps = (state:any) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, {logout})(Navbar);
 