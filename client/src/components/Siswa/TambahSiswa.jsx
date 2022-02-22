import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Card,
  FormSelect,
  FormCheck,
} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from 'sweetalert2'
import Breadcrumb from 'react-bootstrap/Breadcrumb'


export default class TambahSiswa extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.state = {
      nis: "",
      nama: "",
      password: "",
      gender: "",
      kelas: [],
      jurusan: [  ],
      d_kelas: [],
      dataError: "",
      errorMessage: "",
      selected_kelas: "",
      selected_jurusan: "",
      selected_d_kelas: "",
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getKelas = () => {
    axios
      .get("http://localhost:8000/kelas/")
      .then((res) => {
        this.setState({
          kelas: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getJurusan = () => {
    axios
      .get("http://localhost:8000/jurusan/")
      .then((res) => {
        this.setState({
          jurusan: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getDKelas = () => {
    axios
      .get("http://localhost:8000/d_kelas/")
      .then((res) => {
        this.setState({
          d_kelas: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getKelas();
    this.getJurusan();
    this.getDKelas();
  }

  Submit = (e) => {
    e.preventDefault();
    const data = {
      nis: this.state.nis,
      nama: this.state.nama,
      password: this.state.password,
      gender: this.state.gender,
      kelas: this.state.selected_kelas,
      jurusan: this.state.selected_jurusan,
      d_kelas: this.state.selected_d_kelas,
      selected_kelas: this.selected_kelas,
      selected_jurusan: this.selected_jurusan,
      selected_d_kelas: this.selected_d_kelas
    };
    e.preventDefault();
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/siswa", data)
        .then((res) => {
          console.log(res.data.message);
          this.setState({
            dataError: res.data.message,
          });
          console.log(this.state.kelas);
          console.log(this.state.jurusan);
          if (this.state.dataError) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${this.state.dataError}`,
            })
            this.setState({
              nis: "",
            });
          } else {
            Swal.fire(
              'Good job!',
              'Your data hasbeen added!',
              'success'
            )
            this.props.history.push("/admin/siswa");
          }
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };
  render() {
    return (
      <div>
        <Card>

<Card.Body>
  <Breadcrumb style={{
      marginTop: "auto",
      marginBottom: "-10px"
      
    }}>
  <Breadcrumb.Item href="/admin/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/admin/siswa/">Data</Breadcrumb.Item>
  <Breadcrumb.Item active>Add</Breadcrumb.Item>
  </Breadcrumb>
  </Card.Body>
</Card>
<br></br>
      <Card style={{ color: 'black'}}>
        <Card.Body>
        {/* <Sidebar /> */}
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <Form.Label>NIS</Form.Label>
              <Form.Control
                name="nis"
                id="nis"
                type="text"
                value={this.state.nis}
                placeholder="NIS"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("nis", this.state.nis, `required|int`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Siswa</Form.Label>
              <Form.Control
                name="nama"
                id="nama"
                type="text"
                value={this.state.nama}
                placeholder="Nama Siswa"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("nama", this.state.nama, `required`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "password",
                  this.state.password,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <FormSelect name="gender" onChange={this.handleChange}>
                <option>=== Pilih Jenis Kelamin ===</option>
                <option value="L">Laki-Laki</option>
                <option value="P">Perempuan</option>
              </FormSelect>
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("gender", this.state.gender, `required`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kelas</Form.Label>
              <FormSelect name='selected_kelas' onChange={this.handleChange}>
              <option>=== Pilih Kelas ===</option>
                {this.state.kelas.map((kelas) => {
                  return (
                    <option key={kelas.kelas_id} value={kelas.kelas_id}>{kelas.kelas_nama}</option>
                  );
                })}
              </FormSelect>
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("Kelas", this.state.selected_kelas, `required`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jurusan</Form.Label>
              <FormSelect name='selected_jurusan' onChange={this.handleChange}>
                <option>=== Pilih Jurusan ===</option>
                {this.state.jurusan.map((jurusan) => {
                  return (
                    <option key={jurusan.jurusan_id} value={jurusan.jurusan_id}>{jurusan.jurusan_nama}</option>
                  );
                })}
              </FormSelect>
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("Jurusan", this.state.selected_jurusan, `required`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Daftar Kelas</Form.Label>
              <FormSelect name='selected_d_kelas'onChange={this.handleChange}>
                <option>=== Pilih Daftar Kelas ===</option>
                {this.state.d_kelas.map((d_kelas) => {
                  return (
                    <option key={d_kelas.d_kelas_id} value={d_kelas.d_kelas_id}>
                      {d_kelas.d_kelas_nama}
                    </option>
                  );
                })}
              </FormSelect>
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message("Daftar Kelas", this.state.selected_d_kelas, `required`, {
                  className: "text-danger",
                })}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
    );
  }
}
