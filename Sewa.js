import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Sewa extends Component {
    constructor() {
        super();
        this.state = {
            sewa: [],
            id: "",
            nama_lapangan:"",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        if (!localStorage.getItem("Token")) {
            //direct ke hlaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        // fungsi utk membuka form tambah data
        this.setState({ [event.target.name]: event.target.value });
    }
    Add = () => {
        // fungsi utk membuka form edit data
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengosongkan data pada form
        this.setState({
            action: "insert",
            id: "",
            nama_lapangan:"",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: ""
        });
    }
    Edit = (item) => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id: item.id,
            nama_lapangan: item.nama_lapangan,
            id_lapangan: item.id_lapangan,
            id_user: item.id_user,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
            status: item.status
        });
    }
    getSewa = () => {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa";
        axios.get(url)
            .then(response => {
                this.setState({ sewa: response.data.sewa });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/" + id;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    this.getSewa();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    componentDidMount = () => {
        this.getSewa();
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_sewa").modal("hide");
        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("nama_lapangan", this.state.nama_lapangan);
        form.append("id_lapangan", this.state.id_lapangan);
        form.append("id_user", this.state.id_user);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);
        form.append("durasi", this.state.durasi);
        form.append("biaya", this.state.biaya);
        form.append("status", this.state.status);
        axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.getSewa();
            })
            .catch(error => {
                console.log(error);
            });
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/find";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ sewa: response.data.sewa });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-secondary">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Penyewaan</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
                            </div>
                        </div>
                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Lapangan</th>
                                    <th>Tanggal booking</th>
                                    <th>Mulai</th>
                                    <th>Selesai</th>
                                    <th>Durasi</th>
                                    <th>Biaya</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.sewa.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.nama_lapangan}</td>
                                            <td>{item.tgl_book}</td>
                                            <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.durasi}</td>
                                            <td>{item.biaya}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"> Edit</span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"> Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>
                        {/* form modal produk*/}
                        <Modal id="modal_sewa" title="Form Sewa" bg_header="success" text_header="white">
                            <form onSubmit={this.Save}>
                                ID user
                                <input type="text" className="form-control" name="id_user" value={this.state.id_user}
                                    onChange={this.bind} required />
                                Lapangan
                                <input type="text" className="form-control" name="nama_lapangan" value={this.state.nama_lapangan}
                                    onChange={this.bind} required />
                                Tanggal booking
                                <input type="date" className="form-control" name="tgl_book"
                                    value={this.state.tgl_book} onChange={this.bind} required />
                                Mulai
                                <input type="time" className="form-control" name="wkt_mulai"
                                    value={this.state.wkt_mulai} onChange={this.bind} required />
                                Selesai
                                <input type="time" className="form-control" name="wkt_selesai"
                                    value={this.state.wkt_selesai} onChange={this.bind} required />
                                Status
                                <input type="text" className="form-control" name="status"
                                    value={this.state.status} onChange={this.bind} />
                                <button type="submit" className="btn btn-info pull-right m-2">
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
export default Sewa;