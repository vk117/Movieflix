import React from "react";
import {ajax,formHandler} from '../helpers/helpers';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/index.js';



class LoginFormStub extends React.Component {

  loginUser = (event) => {

    event.preventDefault();

    let obj = this,temp = this.form, msg = this.msg;

  

    ajax({ ... formHandler(temp) },(r,status,headers) => { 


      if (headers && typeof headers.authorization !== "undefined" ) {

           msg.className = ' alert alert-success alert-dismissible fade show ';
           msg.querySelector('.alert-inner--text').innerHTML = 'Login succesful, redirecting to dashboard...'; 
        
       
          window.localStorage.setItem("mtoken", headers.authorization);
          window.localStorage.setItem("userid", headers.userid);

          let auth = headers.authorization, userid = headers.userid;

                  ajax({ id: userid }, function (res) {

                    obj.props.manageSession(true,res);
               

                     if(typeof obj.props.location.search !== "undefined" && obj.props.location.search!="") {

                        var redirect = obj.props.location.search.replace("?redirecto=","");
                        obj.props.history.push(redirect); 
                        return;

                     }

                     obj.props.history.push('/dashboard'); 

                  }, '/session', 'post', auth );

        } else {

           msg.className = ' alert alert-warning alert-dismissible fade show ';
           msg.querySelector('.alert-inner--text').innerHTML = 'Invalid login details !';
        }

        msg.style.display = "block";

    },'/login')


  }

	render() {

   if(this.props.guest === false)
      return (<div className='container'><div className='row padding-50'><div className='col-12'><h3>You are already logged in !</h3></div></div></div>);
    
		return (

		<section className="py-xl bg-cover bg-size--cover" style={{ background:"url('/images/the-dark-knight-rises-1920x1200-batman-189.jpg') top left no-repeat", "backgroundSize" : "cover" }} >
        
        <div className="container d-flex align-items-center no-padding">
          <div className="col">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="card ">
                  <div className="card-body">
                    <a href="/" className="btn btn-secondary  btn-zoom--hover mb-5">
                      <span className="btn-inner--icon"><i className="fas fa-arrow-left"></i></span>
                    </a>
                    <span className="clearfix"></span>
                  
                    <h4 className="heading h3  pt-3 pb-5">Welcome back,<br/>
                      login to your account.</h4>

                     <div ref={(el) => {this.msg = el;} } style={{display:"none"}} className="" role="alert">
                      <span className="alert-inner--icon"><i className="fas fa-check"></i></span>
                      <span className="alert-inner--text">Login Successful</span>
                 
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                    </div> 
                    <form ref={(f) => {this.form = f;} } onSubmit={this.loginUser} className="">
                      <div className="form-group">
                        <input required type="email" className="form-control" name="email" placeholder="Your email" defaultValue="" />
                      </div>
                      <div className="form-group">
                        <input type="password" required className="form-control" name="password" placeholder="Password" defaultValue="" />
                      </div>
                      <div className="text-right mt-4"><a href="jsx-a11y/href-no-hash" className="">Forgot password?</a></div>
                      <button type="submit" className="btn btn-primary btn-block btn-lg mt-4">Login</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     </section>
		);

	}

}



function mapStateToProps(state) { 

    return { user : state.user , guest : state.guest , userLoggedIn : state.userLoggedIn };
 } 

function mapDispatchToProps(dispatch) { 

    return bindActionCreators(actions,dispatch);
 } 

const LoginForm = connect(mapStateToProps,mapDispatchToProps)(LoginFormStub); 

export default LoginForm;

