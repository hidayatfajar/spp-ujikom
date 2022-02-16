import React, { Component } from "react";
import { Card, Form, Col, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class Editperiode extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    console.log(this.props.match.params.periode_id);
    this.state = {
      id: this.props.match.params.id,
      periode_mulai: "",
      periode_akhir: "",
      periode_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const periode_id = this.state.id;
    axios
      .get(`http://localhost:8000/periode/${periode_id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({
          periode_id: res.data[0].periode_id,
          periode_mulai: res.data[0].periode_mulai,
          periode_akhir: res.data[0].periode_akhir,
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
      periode_mulai: this.state.periode_mulai,
      periode_akhir: this.state.periode_akhir,
    };
    const periode_id = this.state.periode_id;
    if (this.validator.allValid()) {
      axios
        .put(`http://localhost:8000/ubah/periode/${periode_id}`, data)
        .then((res) => {
          console.log(res.data);
          this.setState({
            periode_mulai: "",
            periode_akhir: "",
          });
          this.props.history.push("/admin/periode");
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
              <Form.Label>Periode ID</Form.Label>
              <Form.Control
                name="periode_id"
                id="periode_id"
                type="text"
                value={this.state.id}
                noValidate
                onChange={this.handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Mulai</Form.Label>
              <Form.Control
                name="periode_mulai"
                id="periode_mulai"
                type="text"
                value={this.state.periode_mulai}
                placeholder="Periode Mulai"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "Periode Mulai",
                  this.state.periode_mulai,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Akhir</Form.Label>
              <Form.Control name="periode_akhir" id="periode_akhir" type="text" value={this.state.periode_akhir} placeholder="Periode Akhir" noValidate onChange={this.handleChange} />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "Periode Akhir",
                  this.state.periode_akhir,
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
