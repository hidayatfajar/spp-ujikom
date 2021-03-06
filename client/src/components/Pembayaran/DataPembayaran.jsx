import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar/SideBar";

export default class Data extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tipe: ""
        };
    }

    getAdmin = () => {
        axios.get("http://localhost:8000/pembayaran/")
            .then((res) => {
                this.setState({
                    data: res.data,
                    tipe: res.data[0].pembayaran_tipe
                });
            });
    };

    handleRemove = (pembayaran_id) => {
        axios
            .delete(`http://localhost:8000/hapus/pembayaran/${pembayaran_id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        this.getAdmin();
    };

    componentDidMount() {
        this.getAdmin();
        // const get = this.state.data.map((data))
        // console.log(get)
    }
    render() {
        const data = this.state.data;
        const get = this.state.data.map((data) => {
            return data.periode_akhir
        })
        console.log(get)
        const selectRow = {
            mode: "radio",
            clickToSelect: true,
        };
        const columns = [
            {
                dataField: "pembayaran_tipe",
                text: "Tipe",
            },
            {
                dataField: "periode_mulai",
                text: "Periode Mulai",
            },
            {
                dataField: "periode_akhir",
                text: "Periode Akhir",
            },
            {
                dataField: "pos_nama",
                text: "Nama Pos",
            },
            {
                dataField: "Aksi",
                text: "Aksi",
                // make delete and update button
                formatter: (cellContent, row) => {
                    return (
                        <div>
                            <Container>
                                <Row>
                                    <Col md={2}>
                                        <Link to={`/admin/pembayaran/ubah/${row.pembayaran_id}`} >
                                            <Button variant="warning" className="mr-2" block >
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                        </Link>
                                    </Col>
                                    <Col >
                                        <Button
                                            variant="danger"
                                            onClick={() => this.handleRemove(row.pembayaran_id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                },
            },
        ];
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Link to={"/admin/pembayaran/tambah"}>
                            <Button className="mr-2" variant="outline-primary" block="">
                                Create
                            </Button>
                        </Link>

                        <table border="2" className="display table table-striped table-hover" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Tipe</th>
                                    <th>Periode</th>
                                    <th>POS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.pembayaran_tipe}</td>

                                            <td>{data.periode_mulai}/{data.periode_akhir}</td>

                                            <td>{data.pos_nama}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              striped
              hover
              condensed
              bordered={false}
              // selectRow={ selectRow }
            /> */}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
