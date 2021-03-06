import React, { useState } from "react";

// package
import { useHistory } from "react-router";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
  Button,
  Image,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCreditCard,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import img from "../Assets/user.jpg";
import notif from "../Assets/svg_notification.svg";


// Import File
import Dashboard from "../Dashboard/Dashboard";

import DataJurusan from "../Jurusan/DataJurusan";
import UbahJurusan from "../Jurusan/UbahJurusan";
import TambahJurusan from "../Jurusan/TambahJurusan";

import DataSiswa from "../Siswa/DataSiswa";
import TambahSiswa from "../Siswa/TambahSiswa";
import UbahSiswa from "../Siswa/UbahSiswa"; //ini yg ga tampil

import DataPos from "../Pos/DataPos";
import AddPos from "../Pos/AddPos";
import EditPos from "../Pos/EditPos";

import DataPeriode from "../Periode/DataPeriode";
import AddPeriode from "../Periode/AddPeriode";
import EditPeriode from "../Periode/EditPeriode";

import DataKelas from "../Kelas/DataKelas";
import Tambahkelas from "../Kelas/TambahKelas";
import UbahKelas from "../Kelas/UbahKelas";

import Pembayaran from "../Pembayaran/Pembayaran";
import JenisPembayaran from "../JenisPembayaran/DataPembayaran";
import DetailPembayaran from "../Pembayaran/DetailPembayaran";
import SetTarif from "../JenisPembayaran/SetTarif";

import "./SideBar.css";
import Pembayaran from "../JenisPembayaran/Pembayaran";

const SideBar = () => {
  const [sidebar, setSidebar] = useState("sidebar");
  const [main, setMain] = useState("main");
  const [text, setText] = useState("block");
  const [button, setbutton] = useState("button");
  const [btnleft, setBtnleft] = useState("block");
  const [btnright, setBtnright] = useState("none");

  const [dropdown, setDown] = useState("none");

  const [mode, setMode] = useState(1);

  const changeSidebar = () => {
    if (mode == 0) {
      setSidebar("sidebar1");
      setMain("main1");
      setbutton("button1");
      setText("none");
      setDown("none");
      setBtnleft("none");
      setBtnright("block");
      setMode(1);
    } else {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setBtnleft("block");
      setBtnright("none");
      setMode(0);
    }
  };

  const changeDropdown = () => {
    if (mode == 0) {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setDown("block");
      setBtnleft("block");
      setBtnright("none");
      setMode(1);
    } else {
      setDown("none");
      setMode(0);
    }
  };
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('dataAdmin');
    history.push('/');

  }
  return (
    <div>
      {/* Navbar */}

      <Navbar
        collapseOnSelect
        className="navbar"
        expand="lg"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand> SPS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav>
            <div className="img">
              <Nav.Item>
                <Image
                  width={40}
                  height={40}
                  src={img}
                  style={{ borderRadius: "20px", marginTop: "4px" }}
                />
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Nama Yang Login"
                  menuVariant="dark">
                  <NavDropdown.Item href="/admin/profile/">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* ------------------------------------------------------ */}

      {/* Sidebar */}

      <div className={sidebar}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <a href="/admin">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>
          <span style={{ display: text }}>Dashboard</span>
        </a>
        {/* --------- */}
        <div className="dropdown">
          <span className="drop">
            <a onClick={changeDropdown} >
              <span className="icon">
                <FontAwesomeIcon icon={faUsers} />
              </span>
              <span style={{ display: text }}>Management Data</span>
            </a>
          </span>

          <div
            id="myDropdown"
            className="dropdown-content"
            style={{ display: dropdown }}
          >
            <ul>
              <a href="/admin/siswa">
                <li>Siswa </li>
              </a>
              <a href="/admin/jurusan">
                <li>Jurusan</li>{" "}
              </a>
              <a href="/admin/kelas">
                <li>Kelas</li>{" "}
              </a>
            </ul>
          </div>
        </div>

        {/* -------- */}
        <a href="/admin/periode">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}> Tahun Ajaran</span>
        </a>

        {/* --------- */}
        <a href="/admin/pos">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Post</span>
        </a>

        {/* ----------- */}
        <a href="/admin/pembayaran">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Pembayaran</span>
        </a>

        <a href="/admin/jenis">
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>{" "}
          <span style={{ display: text }}>Set Tarif</span>
        </a>

        <div className={button}>
          <FontAwesomeIcon
            style={{ display: btnleft }}
            icon={faChevronLeft}
            onClick={changeSidebar}
          />
          <FontAwesomeIcon
            style={{ display: btnright }}
            icon={faChevronRight}
            onClick={changeSidebar}
          />
        </div>
      </div>

      <div className={main}>

        <ProtectedRoute exact path="/admin/siswa" component={DataSiswa} />
        <ProtectedRoute exact path="/admin/siswa/tambah" component={TambahSiswa}/>
        <ProtectedRoute  exact path="/admin/siswa/ubah/:id" component={UbahSiswa}/>

        <ProtectedRoute exact path="/admin/jurusan" component={DataJurusan} />
        <ProtectedRoute  exact  path="/admin/jurusan/ubah/:id"  component={UbahJurusan}/>
        <ProtectedRoute  exact  path="/admin/jurusan/tambah" component={TambahJurusan}/>

        <Route exact path="/admin/jurusan" component={DataJurusan} />
        <Route exact path="/admin/jurusan/ubah/:id" component={UbahJurusan} />
        <Route exact path="/admin/jurusan/tambah" component={TambahJurusan} />

        <ProtectedRoute exact path="/admin/periode/" component={DataPeriode} />
        <ProtectedRoute exact path="/admin/periode/tambah" component={AddPeriode}/>
        <ProtectedRoute exact path="/admin/periode/ubah/:id" component={EditPeriode}
        />

        <ProtectedRoute exact path="/admin/kelas/" component={DataKelas} />
        <ProtectedRoute exact path="/admin/kelas/tambah" component={Tambahkelas}/>
        <ProtectedRoute path="/admin/kelas/ubah/:id" component={UbahKelas}/>

        <ProtectedRoute path="/admin/jenispembayaran" component={JenisPembayaran}/>
        <Route path="/admin/pembayaran/set_tarif/:id" component={SetTarif}/>

        <ProtectedRoute path="/admin/pembayaran" component={Pembayaran} />
        <ProtectedRoute path="/admin/detail_pembayaran/:id" component={DetailPembayaran} />
      </div>
    </div>
  );
};

export default SideBar;
