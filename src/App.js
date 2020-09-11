import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes'

import { Template } from './components/MainComponents'
import Header from './components/Header'
import Footer from './components/Footer'

import './App.css'

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user:state.user
  }
}

const mapDispathToProps = (dispath) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispathToProps)(Page)
