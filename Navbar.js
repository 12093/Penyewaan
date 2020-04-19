import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {
    Logout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        localStorage.removeItem("users");
        window.location = "/login";
    }
    render(){
        return (
            <div className="navbar navbar-expand-lg bg-secondary navbar-dark">
                <a className="navbar-brand ">allfield</a>
                <button type="button" className="navbar-toggler navbar-toggler-right"
                data-toggle="collapse" data-target="#menu">
                    <span className="navbar navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="menu">
                    <ul className="navbar-nav">
                        {/* List menu */}
                        <li className="navbar-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/users">Member</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/lapangan">Lapangan</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/sewa">Sewa</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" onClick={this.Logout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    
}
export default Navbar;