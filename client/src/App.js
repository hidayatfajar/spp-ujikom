import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Pages/Login";
import LoginAdmin from "./components/Admin/LoginAdmin";
import Sidebar from './components/Sidebar/SideBar'
import LandingPage from "./components/LandingPage/LandingPage";
import DataJurusan from './components/Jurusan/DataJurusan'

import DataSiswa from './components/Siswa/DataSiswa'
import TambahSiswa from './components/Siswa/TambahSiswa'
import UbahSiswa from './components/Siswa/UbahSiswa'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/loginadmin" component={LoginAdmin} />

            <Route exact path="/admin" component={Sidebar} />
            {/* <Route exact path="/admin/jurusan" component={DataJurusan} />

            <Route exact path="/admin/siswa" component={DataSiswa} />
            <Route exact path="/admin/siswa/tambah" component={TambahSiswa} />
            <Route exact path="/admin/siswa/ubah/:siswa_id" component={UbahSiswa} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
