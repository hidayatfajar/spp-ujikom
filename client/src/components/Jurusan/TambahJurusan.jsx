import React, { Component } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

export default class TambahJurusan extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      jurusan_nama: "",
      dataError: "",
      errorMessage: "",
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();
    const data = {
      jurusan_nama: this.state.jurusan_nama,
    };
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/jurusan", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
          } else {
            this.props.history.push("/admin");
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
        <div className="container">
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Jurusan</Form.Label>
              <Form.Control
                name="jurusan_nama"
                id="jurusan_nama"
                type="text"
                value={this.state.jurusan_nama}
                placeholder="Nama Jurusan"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "jurusan_nama",
                  this.state.jurusan_nama,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
