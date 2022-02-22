import React, { Component } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Container,
  Tab,
  Tabs,
  Button,
  Nav,
  Table,
  FormSelect,
} from "react-bootstrap";
import axios from "axios";

export default class Pembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periode: [],
      nis: "",
      nis_siswa: "",
      tahun_ajaran: "",
      nama: "",
      jenis_kelamin: "",
    };
  }
  getPeriode = () => {
    axios.get("http://localhost:8000/periode").then((res) => {
      console.log(res);
      this.setState({
        periode: res.data,
      });
      console.log(this.state.periode);
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Cari = () => {
    const id = this.state.nis;
    axios.get(`http://localhost:8000/siswa/${id}`).then((res) => {
      this.setState({
        nis_siswa: res.data[0].siswa_nis,
        nama: res.data[0].siswa_nama,
        jenis_kelamin: res.data[0].siswa_gender,
      });
      console.log(res.data[0]);
    });
  };

  componentDidMount = () => {
    this.getPeriode();
    console.log(this.state.nis_siswa);
    console.log(this.state.jenis_kelamin);
    console.log(this.state.tahun_ajaran);
    console.log(this.state.periode);
  };
  render() {
    return (
      <div>
        {/* Make a form input NIS siswa inside card */}
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <hr />
            <Form>
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Tahun Ajaran
                    </Form.Label>
                    <Col>
                      <FormSelect
                        name="tahun_ajaran"
                        onChange={this.handleChange}
                      >
                        <option>Pilih Tahun Ajaran</option>
                        {this.state.periode.map((item) => {
                          return (
                            <option key={item.periode_id}>
                              {item.periode_mulai}/{item.periode_akhir}
                            </option>
                          );
                        })}
                      </FormSelect>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Cari Siswa
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="NIS Siswa"
                        name="nis"
                        id="nis"
                        type="text"
                        value={this.state.nis}
                        placeholder="Nama Jurusan"
                        noValidate
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col>
                      <Button variant="primary" block onClick={this.Cari}>
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Informasi Siswa</Card.Title>
            <hr />
            <Table striped hover size="sm">
              <tbody>
                <tr>
                  <td>Tahun Ajaran</td>
                  <td>{`${this.state.tahun_ajaran}`}</td>
                </tr>
                <tr>
                  <td>NIS</td>
                  <td>{`${this.state.nis_siswa}`}</td>
                </tr>
                <tr>
                  <td>Nama Siswa</td>
                  <td>{`${this.state.nama}`}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>{`${this.state.jenis_kelamin}`}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br />
        <Card style={{color : "black"}}>
          <Card.Body>
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Home">
                <div>asdwasdwasdawsd</div>
              </Tab>
              <Tab eventKey="profile" title="Profile">
                <div>awdasdwasdwa</div>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
