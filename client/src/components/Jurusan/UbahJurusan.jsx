import React, { Component } from "react";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class FormUbah extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    console.log(this.props.match.params.id);
    this.state = {
      id: this.props.match.params.id,
      jurusan_nama: "",
      jurusan_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const jurusan_id = this.state.id;
    axios
      .get(`http://localhost:8000/jurusan/${jurusan_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
        this.setState({
          jurusan_id: res.data[0].jurusan_id,
          jurusan_nama: res.data[0].jurusan_nama,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getData();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editData = (e) => {
    e.preventDefault();
    const data = {
      jurusan_nama: this.state.jurusan_nama,
    };
    const jurusan_id = this.state.jurusan_id;
    if (this.validator.allValid()) {
      axios
        .put(`http://localhost:8000/ubah/jurusan/${jurusan_id}`, data)
        .then((res) => {
          console.log(res.data);
          this.setState({
            jurusan_nama: "",
          });
          this.props.history.push("/admin");
        })
        .catch((err) => {
          console.log(err);
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
          <Form onSubmit={this.editData}>
            <Form.Group className="mb-3">
              <Form.Label>Id jurusan</Form.Label>
              <Form.Control
                name="jurusan_id"
                id="jurusan_id"
                type="text"
                value={this.state.jurusan_id}
                placeholder="Id jurusan"
                noValidate
                onChange={this.handleChange}
                readOnly
              />
            </Form.Group>
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
                  "Nama Jurusan",
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
