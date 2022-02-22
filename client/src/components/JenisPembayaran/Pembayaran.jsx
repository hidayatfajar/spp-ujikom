import React, { Component } from 'react';
import {Card, Form, Button} from 'react-bootstrap'
import axios from 'axios'

export default class Pembayaran extends Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.match.params.id,
            data: {},
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      getSiswa = () => {
        const siswa_id = this.state.id
        axios.get(`http://localhost:8000/siswa/${siswa_id}` )
        .then((res) => {
          this.setState({
            data: res.data[0],
          });
          console.log(this.state.data);
        });
      };
      componentDidMount() {
        this.getSiswa();
      }

    render()
    {
        return(
            <div>

            <Card style={{color: 'black'}}>
                <Card.Body>
                    <Form.Group className="mb-3">
              <Form.Label>Cari siswa</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                value=""
                placeholder="Masukan NIS"
                noValidate
                onChange={this.handleChange}
              /> </Form.Group>
              <Button variant="primary" type="submit">
              Go!
            </Button>
                </Card.Body>
            </Card>
            </div>
        )
    }
}