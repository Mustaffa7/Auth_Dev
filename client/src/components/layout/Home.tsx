import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <section>
        <div>
            <h1>Professional development</h1>
            <p>Learn more, earn more!</p>
            <div>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    </section>
  );
};

export default Home;
