import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

import React, {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import MintBox from "./components/mintBox/MintBox";
import Logo from "./assets/img/img1.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "./redux/data/dataActions";
import {connect} from "./redux/blockchain/blockchainActions";
import ToastNoti from "./components/toastNoti/ToastNoti";
import RigthSideImg from "./assets/img/img2.png";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  useEffect(() => {
    getData();
  }, [blockchain.account]);
  return (
    <Container fluid className="main d-flex flex-column justify-content-center align-items-center">
      <Container className="d-flex flex-column justify-content-center align-items-center"
                 style={{
                   paddingLeft: 0,
                   paddingRight: 0
                 }}>
        < Row className="main-logo d-flex flex-column justify-content-center align-items-center">
          <div className="main-logo__container d-flex justify-content-center align-items-center">
            {/*<img src={Logo} alt=""/>*/}
            <h1 className="logo-content">dickpunks</h1>
          </div>
        </Row>
        <Row className="main-container justify-content-center align-items-lg-center">
          <Col lg={7} md={12} sm={12} className="main-left__side">
            <div className="left-side__container d-flex justify-content-center align-items-center">
              {
                blockchain.account ? <MintBox/> : (
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1 className="left-side__title">MINT YOUR DICKPUNKS</h1>
                    <button className="primary-btn" onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}>CONNECT
                    </button>
                  </div>
                )
              }
            </div>
          </Col>
          <Col lg={5} md={12} sm={12} className="main-right__side d-flex justify-content-center align-items-center">
            <div className="right-side__container d-flex justify-content-center align-items-center">
              <img src={RigthSideImg} alt=""/>
            </div>
          </Col>
        </Row>
        <Row className="main-footer d-flex justify-content-center align-items-center">
          <a href="https://opensea.com/dickpunks" className="primary-btn">open sea</a>
          <a href="https://twitter.com/cryptodickpunk" className="primary-btn">twitter</a>
        </Row>
        <ToastNoti errorMsg={blockchain.errorMsg} titleNoti={"Error"} position={"top-end"}/>
      </Container>
    </Container>
  );
}

export default App;
