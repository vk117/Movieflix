import React from "react";
import { rBridge, ajax } from '../helpers/helpers';


class Header extends React.Component {

  logout = (e) => {
    e.preventDefault();

    // ajax({}, function (r) {

      window.localStorage.removeItem("mtoken");
      window.localStorage.removeItem("userid");
      window.location.href = '/';

    // }, '/logout')

  }

  render() {

    let nav, logged_in_links = '';


    if (this.props.userLoggedIn === true) {


      var avatar;
      if (this.props.user.avatar === "" || typeof this.props.user.avatar === "undefined") {
        avatar = <span className="avatar bg-red avatar-sm">{this.props.user.name}</span>
      } else {
        avatar = <img alt="avatar" src={this.props.user.avatar} className="avatar avatar-sm" />
      }

      nav = (<div id="main-area" className='clearfix'>

        <div className="user-avatar">
          {avatar}
        </div>

        <div className="greet">
          <a href="/dashboard"><span>Hi, {this.props.user.screenName}</span> </a>
        </div>


      </div>);
      logged_in_links = (<ul className="clearfix">
        <li><a href="/subscription" className="">Subscription</a></li>
        <li><a href="/logout" onClick={this.logout} className="">Logout</a></li></ul>);

    } else {

      nav = (<div id="main-area">

        <a href="/login" className="login">Login <i className="fas fa-angle-right"></i></a>
        <a href="/register" className="register">Register</a>

      </div>
      );

    }

    return (


      <div id="main-bar">

        <div className="container-fluid">

          <div className="row">
            <div className="col-5 col-md-5">
              <a href="/" id="logo"><img src="/css/i/logo.png" alt="" /></a>

             {/*} <div id="search-bar">
                <form action="/movies">
                  <svg height="16px" width="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <title>zoom 2</title>
                    <g fill="#000000">
                      <path d="M12.7,11.3c0.9-1.2,1.4-2.6,1.4-4.2C14.1,3.2,11,0,7.1,0S0,3.2,0,7.1c0,3.9,3.2,7.1,7.1,7.1 c1.6,0,3.1-0.5,4.2-1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L12.7,11.3z M7.1,12.1 C4.3,12.1,2,9.9,2,7.1S4.3,2,7.1,2s5.1,2.3,5.1,5.1S9.9,12.1,7.1,12.1z" fill="#000000" />
                    </g>
                  </svg>
                  <input placeholder="Search movie..." type="text" name="s" />
                </form>
    </div>{*/}
            </div>

            <div className="col-7 col-md-7">

              {nav}

              <nav id="main-menu">
                  {logged_in_links}
                <ul className='clearfix'>
                  <li><a href="/">Home</a></li>
                  <li><a href="/movies">Movies</a></li>
                  <li><a href="/scoreboard">Scoreboard</a></li>
                  <li><a href="/genre"
                  >Categories</a></li>


                </ul>
              </nav>





            </div>


          </div>

        </div>
        
      </div>);

  }

}



export default rBridge(Header);

