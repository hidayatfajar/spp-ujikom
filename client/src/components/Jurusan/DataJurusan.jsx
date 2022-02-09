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
    };
  }

  getAdmin = () => {
    axios.get("http://localhost:8000/jurusan/").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  handleRemove = (jurusan_id) => {
    axios
      .delete(`http://localhost:8000/hapus/jurusan/${jurusan_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.getAdmin();
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
    this.getAdmin();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "jurusan_id",
        text: "No",
      },
      {
        dataField: "jurusan_nama",
        text: "Nama Jurusan",
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
                    <Link to={`/jurusan/ubah/${row.jurusan_id}`} >
                      <Button variant="warning" className="mr-2" block >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                  </Col>
                  <Col >
                    <Button
                      variant="danger"
                      onClick={() => this.handleRemove(row.jurusan_id)}
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
            <Link to={"/jurusan/tambah"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Create
              </Button>
            </Link>

            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
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
