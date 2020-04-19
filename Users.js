import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      action: "",
      find: "",
      message: ""
    };

    // if token doesn't exist in local storage
    if (!localStorage.getItem("Token")) {
      // directs to login page
      //  window.location = "/";
    }
  }

  bind = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  bindImage = (e) => {
      this.setState({image: e.target.files[0]})
  }

  Add = () => {
    // shows modal
    $("#modal_users").modal("show");
    // empties form data
    this.setState({
      action: "insert",
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
    });
  };

  Edit = item => {
    // shows modal
    $("#modal_users").modal("show");
    // fills in form data
    this.setState({
      action: "update",
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      role: item.role,
    });
  };

  getUser = () => {
    $("#loading").toast("show");
    let url = "http://localhost/lapangan/public/member";
    axios
      .get(url)
      .then(response => {
        this.setState({ users: response.data.users });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  };

  Drop = id => {
    if (window.confirm("Are you sure you want to drop this data?")) {
      $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member/drop/" + id;
      axios
        .delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.getUser();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  componentDidMount = () => {
    this.getUser();
  };

  Save = (event) => {
    event.preventDefault();
    // shows loading process
    $("#loading").toast("show");
    // closes modal form
    $("#modal_users").modal("hide");
    let url = "http://localhost/lapangan/public/member/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    axios
      .post(url, form)
      .then(response => {
        $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.getUser();
      })
      .catch(error => {
        console.log(error);
      });
  };

  search = (event) => {
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member/find";
      let form = new FormData();
      form.append("find", this.state.find);
      axios
        .post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ users: response.data.users });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card mt-2">
          {/* card header */}
          <div className="card-header bg-primary">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data Member</h4>
              </div>

              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="find"
                  onChange={this.bind}
                  value={this.state.find}
                  onKeyUp={this.search}
                  placeholder="Pencarian..."
                />
              </div>
            </div>
          </div>
          {/* card content */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            <Toast id="loading" autohide="false" title="Informasi">
              <span className="fa fa-spin fa-spinner"></span> Loading
            </Toast>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          className="m-1 btn btn-sm btn-info"
                          onClick={() => this.Edit(item)}
                        >
                          <span className="fa fa-edit"></span>
                        </button>
                        <button
                          className="m-1 btn btn-sm btn-danger"
                          onClick={() => this.Drop(item.id)}
                        >
                          <span className="fa fa-trash"></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* add button */}
            <button className="btn btn-success my-2" onClick={this.Add}>
              <span className="fa fa-plus"></span> Tambah Data
            </button>

            {/* user modal form */}
            <Modal
              id="modal_users"
              title="Form Users"
              bg_header="success"
              text-header="white"
            >
              <form onSubmit={this.Save}>
                Username
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.bind}
                  required
                />
                 Email
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.bind}
                  required
                />
                Password
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.bind}
                  required
                />
                <div className="form-group">
                  <label for="role">Role</label>
                  <select class="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                    <option value=" "> </option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <button className="btn btn-info pull-right m-2">
                  <span className="fa fa-check"></span> Simpan
                </button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
