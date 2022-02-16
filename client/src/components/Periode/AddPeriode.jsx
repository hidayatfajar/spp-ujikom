import React, { Component } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

export default class AddPeriode extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      periode_mulai: "",
      periode_akhir: "",
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
      periode_mulai: this.state.periode_mulai,
      periode_akhir: this.state.periode_akhir,
    };
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/periode", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
            periode_mulai: "",
            periode_akhir: "",

          });
          if (this.state.dataError) {
          } else {
            // this.props.history.push("/admin/periode");
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
              <Form.Label>Periode Mulai</Form.Label>
              <Form.Control name="periode_mulai" id="periode_mulai" type="number" maxlength={4} value={this.state.periode_mulai} placeholder="Periode Mulai" noValidate onChange={this.handleChange} />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "periode_mulai",
                  this.state.periode_mulai,
                  `required|min:0,num|numeric`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Akhir</Form.Label>
              <Form.Control name="periode_akhir" id="periode_akhir" type="number"  maxlength={4} value={this.state.periode_akhir} placeholder="Periode Akhir" noValidate onChange={this.handleChange} />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "periode_akhir",
                  this.state.periode_akhir,
                  `required|min:0,num|numeric`,
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
