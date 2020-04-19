import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide1 from '../image/Slide1.jpg';
import Slide2 from '../image/Slide2.jpg';
import Slide3 from '../image/Slide3.jpg';
import LapanganItem from './LapanganItem';

export default class Home extends React.Component {
    render() {
        const renderData = this.state.lapangan.map((item, id) => {
            return (
                <LapanganItem item={item} key={id} />
            )
        })
        return (<div className=" container">
            <div className="row">
                <div className="col-lg-3">
                    <h1 className="my-3">All Field</h1>
                    <hr></hr>
                    <h6 className="my-3">All Field adalah tempat penyewaan lapangan online dengan mudah dan cepat</h6>
                    <hr></hr>
                    <input type="text" className="form-control" name="find" value={this.state.find} onChange={this.bind} onKeyUp={this.Search} required placeholder="Search.." />
                </div>
                <div className="col-lg-9">
                    <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                            <li data-target="#slideshow" data-slide-to="1"></li>
                            <li data-target="#slideshow" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src={Slide3} alt="Third slide" />
                            </div>

                        </div>
                        <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <table className="table">
                            <ul class="list-group">
                                <li class="list-group-item"></li>
                            </ul>
                        </table>

                    <div className="row">
                    {renderData}
                    </div>
                    <div><hr></hr></div>
                    <div className="col-lg-6">
                    <h2 className="my-4 ">CONTACT US</h2>
                        <form onSubmit={this.Save}>
                                <input type="text" className="form-control" name="name" value={this.state.name}
                                onChange={this.bind} required placeholder="Full Name" />
                                <br></br>
                                <input type="email" className="form-control" name="email"
                                value={this.state.email} onChange={this.bind} required placeholder="Email Address" />
                                <br></br>
                                <input type="text" className="form-control"
                                onChange={this.bind} required placeholder="Message" />
                            <button type="submit" className="btn btn-info pull-right m-2">
                                <span className="fa fa-check"></span> SEND
                            </button>
                        </form>
                </div>
                </div>
            </div>
        </div>);
    }
    constructor(props) {
        super(props);
        this.state = {
            lapangan: [],
            find: ""
        };

    }
    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    getLapangan = () => {
        let url = "http://localhost/lapangan/public/lapangan";
        axios.get(url)
            .then(res => {
                this.setState({ lapangan: res.data.lapangan });
            })
            .catch(error => {
                console.log(error);
            });
    };
    Search = (e) => {
        if (e.keyCode === 13) {
            let url = "http://localhost/lapangan/public/lapangan";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(res => {
                    this.setState({ lapangan: res.data.lapangan });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    componentDidMount() {
        this.getLapangan();
    }
}