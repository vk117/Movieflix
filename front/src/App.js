
import React, { Component } from 'react';
import Router from './components/Router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/index.js';

import {ajax} from './helpers/helpers';

import Header from './layout/header';
import Footer from './layout/footer';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

class AppStub extends Component {

  componentWillMount() { 

    // global object for anayltics 
    window.MovieFlix_Analytics = { 
      clicks : 0,
      area_monitor : []
    }

    window.logMovieFlix_Analytics = true;

    let obj = this , auth = null , userid = -1;

    if (window.localStorage.getItem("mtoken"))
      auth = window.localStorage.getItem("mtoken")

    if (window.localStorage.getItem("userid"))
      userid = window.localStorage.getItem("userid")

    ajax({ id : userid  },function(response){

        let u = {};
   

        if(typeof response !== "undefined")
          u = response;

          obj.props.manageSession(true,u);
      

    }, '/session','post', auth);

 

  } 

  render() {

    let warning = "";

    if (this.props.user.status === "unverfied")
      warning = (<div className="col-12 col-lg-12"><div class="alert alert-info alert-dismissible fade show" role="alert">
        <span class="alert-inner--text">Please verify your mail !</span>
      </div></div>);

      if(this.props.user.role === "admin")
      warning = "";

    return (
      <div className="App">
       <Header />
        {warning}
        <Router />
       <Footer />
       <ToastContainer />
      </div>
    );
  }
}

function mapStateToProps(state) { 

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const App = connect(mapStateToProps,mapDispatchToProps)(AppStub); 

export default App;

