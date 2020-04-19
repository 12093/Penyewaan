import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./client/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Users from "./page/Users";
import Lapangan from "./page/Lapangan";
import Sewa from "./page/Sewa";

class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Route path="/home">
          <Navbar />
          <Home />
        </Route>
        <Route path="/users">
          <Navbar />
          <Users />
        </Route>
        <Route path="/lapangan">
          <Navbar />
          <Lapangan />
        </Route>
        <Route path="/sewa">
          <Navbar />
          <Sewa />
        </Route>
      </Switch>
      
    );
  }
}
export default Utama;