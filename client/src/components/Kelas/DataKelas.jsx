import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
// import Sidebar from '../Sidebar/SideBar'

export default class DataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getkelas = () => {
    axios.get("http://localhost:8000/kelas/").then((res) => {
      this.setState({
        data: res.data,
      });
      console.log(this.state.data);
    });
  };

  handleRemove = (kelas_id) => {
    axios
      .delete(`http://localhost:8000/hapus/kelas/${kelas_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.getkelas();
  };

  //   getAdmin = () => {
  //       axios.get('http://localhost:8000/jurusan/')
  //       .then((response) => response.json())
  //       .then((json) => {
  //           console.log(json)
  //           this.setState({
  //               data : json
  //           })
  //       })
  //   }

  componentDidMount() {
    this.getkelas();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "kelas_id",
        text: "kelas ID",
        sort : true
      },
      {
        dataField: "kelas_nama",
        text: "Nama kelas",
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              {/* <Sidebar /> */}
              <Container>
                <Row>
                  <Col md={4}>
                    <Link to={`/admin/kelas/ubah/${row.kelas_id}`} >
                      <Button variant="warning" className="mr-2" block >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                  </Col>
                  <Col >
                    <Button
                      variant="danger"
                      onClick={() => this.handleRemove(row.kelas_id)}
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
    const defaultSorted = [
        {
          dataField: "kelas_id",
          order: "asc",
        },
      ];
    return (
      <div>
        <Card>
          <Card.Body>
            <Link to={"/admin/kelas/tambah/"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Create
              </Button>
            </Link>

            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              defaultSorted={defaultSorted}
              striped
              hover
              condensed
              bordered={false}
              // selectRow={ selectRow }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
