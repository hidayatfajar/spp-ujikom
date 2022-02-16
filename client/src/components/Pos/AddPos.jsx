import React, { Component } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

export default class Tambahpos extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      pos_nama: "",
      pos_deskripsi: "",
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
      pos_nama: this.state.pos_nama,
      pos_deskripsi: this.state.pos_deskripsi,
    };
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/pos", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
          } else {
            this.props.history.push("/admin/pos");
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
              <Form.Label>Nama pos</Form.Label>
              <Form.Control name="pos_nama" id="pos_nama" type="text" value={this.state.pos_nama} placeholder="Nama pos" noValidate onChange={this.handleChange} />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "pos_nama",
                  this.state.pos_nama,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pos Deskripsi</Form.Label>
              <Form.Control name="pos_deskripsi" id="pos_deskripsi" type="text" value={this.state.pos_deskripsi} placeholder="Nama pos" noValidate onChange={this.handleChange} />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "pos_deskripsi",
                  this.state.pos_deskripsi,
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
