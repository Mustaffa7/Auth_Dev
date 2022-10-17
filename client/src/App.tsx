import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from './components/layout/auth/Login';
import Register from './components/layout/auth/Register';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import {loadUser} from "./actions/auth";
import setAuthToken from './helpers/setAuthToken';

//Redux
import {Provider} from 'react-redux';
import store from "./store";



// run setAuthToken
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
