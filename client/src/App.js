import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Pages/Login";
import LoginAdmin from "./components/Admin/LoginAdmin";
import LandingPage from "./components/LandingPage/LandingPage";

import User from "./components/User/Akun";
import Dashboard from "./components/Dashboard/Dashboard";

import DataSiswa from './components/Siswa/DataSiswa'
import TambahSiswa from './components/Siswa/TambahSiswa'
import UbahSiswa from './components/Siswa/UbahSiswa'

import DataJurusan from './components/Jurusan/DataJurusan'
import TambahJurusan from "./components/Jurusan/TambahJurusan";
import UbahJurusan from './components/Jurusan/UbahJurusan'

import DataKelas from "./components/Kelas/DataKelas";
import Tambahkelas from "./components/Kelas/TambahKelas";
import Ubahkelas from "./components/Kelas/UbahKelas";

import DataPos from "./components/Pos/DataPos";
import AddPos from "./components/Pos/AddPos";
import EditPos from "./components/Pos/EditPos";

import DataPeriode from "./components/Periode/DataPeriode";
import AddPeriode from "./components/Periode/AddPeriode";
import EditPeriode from "./components/Periode/EditPeriode";

import DataPembayaran from "./components/Pembayaran/DataPembayaran"
import ProtectedRoute from "./ProtectedRoutes"
import SideBar from "./components/Sidebar/SideBar";

export default class App extends Component {
  render() {

    return (
      <div>

        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={LoginAdmin} />
            <Route path="/admin" component={SideBar} />
          </Switch>



          {/* <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/jurusan" component={DataJurusan} />
            <Route exact path="/admin/jurusan/ubah/:id" component={UbahJurusan} />
            <Route exact path="/admin/jurusan/tambah" component={TambahJurusan} /> */}

          {/* <Route exact path="/admin/siswa" component={DataSiswa} />
            <Route exact path="/admin/siswa/tambah" component={TambahSiswa} />
            <Route exact path="/admin/siswa/ubah/:id" component={UbahSiswa} /> */}

          {/* <Route exact path="/user/" component={User} /> */}

          {/* <Route exact path="/admin/pos/" component={DataPos} />
            <Route exact path="/admin/pos/tambah" component={AddPos} />
            <Route exact path="/admin/pos/ubah/:id" component={EditPos} /> */}

          {/* <Route exact path="/admin/periode/" component={DataPeriode} />
            <Route exact path="/admin/periode/tambah" component={AddPeriode} />
            <Route exact path="/admin/periode/ubah/:id" component={EditPeriode} /> */}

          {/* <Route exact path="/admin/kelas/" component={DataKelas} />
            <Route exact path="/admin/kelas/tambah" component={Tambahkelas} />
            <Route exact path="/admin/kelas/ubah/" component={Ubahkelas} /> */}

          {/* <Route exact path="/admin/pembayaran" component={DataPembayaran} /> */}
        </BrowserRouter>
      </div>
    );
  }
}
