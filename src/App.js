import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from "./component/Home";
import Voting from "./component/Voting/Voting";
import Results from "./component/Results/Results";
import Registration from "./component/Registration/Registration";
import AddCandidate from "./component/Admin/AddCandidate/AddCandidate";
import Verification from "./component/Admin/Verification/Verification";
//import test from "./component/test";
//import StartEnd from "./component/Admin/StartEnd/StartEnd";

import Footer from "./component/Footer/Footer";

import "./App.css";

export default class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/AddCandidate" element={<AddCandidate />}></Route>
                <Route exact path="/Voting" element={<Voting />}></Route>
                <Route exact path="/Results" element={<Results />}></Route>
                <Route exact path="/Registration" element={<Registration />}></Route>
                <Route exact path="/Verification" element={<Verification />}></Route>
                <Route exact path="/test" element={<test />}></Route>
                <Route exact path="*" element={<NotFound />}></Route>
            </Routes>
            <Footer />
          </div>
        </Router>
    );
  }
}
// It renders a 404 page 
class NotFound extends Component {
  render() {
    return (
      <>
        <h1>404 NOT FOUND!</h1>
        <center>
          <p>
            The page your are looking for doesn't exist.
            <br />
            Go to{" "}
            <Link
              to="/"
              style={{ color: "black", textDecoration: "underline" }}
            >
              Home
            </Link>
          </p>
        </center>
      </>
    );
  }
}
