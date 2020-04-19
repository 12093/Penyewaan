import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      message: ""
    }
  } 
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  } 
  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form) 
      .then(response => {
        let logged = response.data.status;
        let role = response.data.role;
        if (logged) {
          if (role === "admin") {
            window.location = "/Products";
          } else {
            window.location = "/Home";
          }
          this.setState({ message: "Login Berhasil" });
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("id", JSON.stringify(response.data.users.id));
          localStorage.setItem("role", response.data.users.role)
        } else {
          this.setState({ message: "Login Gagal" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <div className="container" style={{ width: "40%" }}>
        <br></br><br></br>
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="text-dark float">Login</h5>
          </div>
          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
            <label for="username">Username</label>
              <input
                type="text" className="form-control m-1" name="username"
                value={this.state.username} onChange={this.bind}
                required placeholder="Masukkan username" />
                <label for="password">Password</label>
              <input
                type="password" className="form-control m-1" name="password"
                value={this.state.password} onChange={this.bind}
                required placeholder="Masukkan password" />
              <br></br>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Login
                </button>
                <a href="/register">Don't have an account? register here!</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;