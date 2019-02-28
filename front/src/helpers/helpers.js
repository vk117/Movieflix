import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';


import * as actions from '../actions/index.js';
var request_logs = {};

/**
 * Custom ajax handler to make things easier.
 */

axios.defaults.withCredentials = true;

export function ajax(opts, callback, url = '/ajax', request = 'post' , auth = null ) {

  let config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'  } };

  var r = axios[request];

  if (auth !== null) {
    config.headers['Authorization'] = auth;
  }

  if (request === 'get') {
    opts = { params: opts };
  }
  // console.log(url,config ,  request )

  r(url, opts, config)
    .catch(error => {

      console.log(error)

      if (url =="/login")
      toast.info("Invalid login details", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 6000
      }); 

      if (url == "/v1/api/user/admin")
        toast.info("Only Spartan email ids allowed !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 6000
        }); 

    })
    .then(function (response) {

      

      if (typeof response === "undefined") {

        return;
      }

      
      if (typeof request_logs[url + "-" + request] !== "undefined")
        delete request_logs[url + "-" + request];

      callback(response.data, response.status , response.headers);

    });
};


/**
 * Custom ajax handler to make things easier.
 */
export function ajaxMultiparts(url, form, callback, request = 'post') {

  var tempFormData = new FormData(form);

  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  var r = axios[request];

  r(url, tempFormData, config)

    .then(function (response) {

      callback(response.data, response.status);

    });
};



/**
 * Get all inputs from form
 */

export function formHandler(form) {

  var data = {};

  var inputs = form.querySelectorAll('input,textarea,select');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== '') {

      if (inputs[i].name in data){
        data[inputs[i].name] = data[inputs[i].name]+","+inputs[i].value.trim();
      }
      else {
        data[inputs[i].name] = inputs[i].value.trim();

      }

    }
     
  }


  return data;

}

/**
 * React - Redux Bridge
 */

export function rBridge(component) {


  function mapStateToProps(state) {

    return { user: state.user, guest: state.guest, userLoggedIn: state.userLoggedIn, booking: state.booking };
  }

  function mapDispatchToProps(dispatch) {

    return bindActionCreators(actions, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(component);

}


/**
 * Get movie from hall
 */

export function getMovie(moviehall, id) {

  var movie = false;

  // console.log(moviehall);

  for (var i = 0; i < moviehall.movies.length; i++) {

    // console.log(moviehall.movies[i].movie_id._id,id); 

    if (moviehall.movies[i].movie_id._id === id) {
      movie = moviehall.movies[i];
      return movie; // this is a movie object with time and screen things 
    }

  }


  return movie;
}

export function logAnalytics() {

  ajax({ ping: window.MovieFlix_Analytics }, function (response) {

  }, "/v1/api/analytics");

}

export function getYoutubeId(url = "") {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    let match = url.match(regExp);
    let id = (match && match[7].length == 11) ? match[7] : false;

  return id;
}