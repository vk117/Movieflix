import React from "react";
import {rBridge,ajax} from '../helpers/helpers';

class DashboardTabbedNavStub extends React.Component {

  constructor(props) {

    super(props);


    window.logMovieFlix_Analytics = false;

  }

  logout = (e) => {
    e.preventDefault();

    // ajax({}, function (r) {

    window.localStorage.removeItem("mtoken");
    window.localStorage.removeItem("userid");
    window.location.href = '/';

    // }, '/logout')

  }


  rPush = (e) => {

     if(this.props.push) {

          e.preventDefault();
          this.props.push(e.target.dataset.href);

     } 

  }

	render() {
	
  var admin_menu = null;

	if(this.props.guest === true)
		return null;

  if(this.props.user.role === 'admin') {
    admin_menu = (<div className="admin-sub-sidebar">
            <div className="inner-admin-sub-sidebar">
                  
                  <h5>Movies</h5>  
                  <ul>
                    <li><a onClick={this.rPush} data-href="/dashboard/movie/new" href="/dashboard/movie/new">Add Movie</a></li>
                    <li><a onClick={this.rPush} href="/dashboard/movies">List Movies</a></li>
                  </ul>

                  <h5>Genre</h5>  
                  <ul>
                    <li><a href="/dashboard/genre/new">Add Genre</a></li>
                    <li><a href="/dashboard/genre">List Genre</a></li>
                  </ul>


                  <h5>Users</h5>  
                  <ul>
                    <li><a href="/dashboard/user/new">Add User</a></li>
                    <li><a href="/dashboard/users">List Users</a></li>
                  </ul>

                  <h5>Activities</h5>  
                  <ul>
                    <li><a href="/dashboard/admin/topusers">Top users by Plays</a></li>
                    <li><a href="/dashboard/admin/topmovies">Top Movies by Plays</a></li>
                  </ul>
                  <h5>Financial Activities</h5>  
                  <ul>
                    <li><a href="/dashboard/admin/finance">View Finance</a></li>
                  </ul>

                  <h5>User Activities</h5>
                  <ul>
                    <li><a href="/dashboard/admin/usersubscribed">Subscribed Users</a></li>
                    <li><a href="/dashboard/admin/userpay">Pay Per user Users</a></li>
                    <li><a href="/dashboard/admin/active">Active Users</a></li>
                    <li><a href="/dashboard/admin/all">All Users in 12 months</a></li>
                  </ul>

            </div>
        </div>);


  }

    var loc = window.location.href.split('dashboard');
    loc = loc[loc.length - 1];

    console.log(loc);

		return (
                
                <div>	

                <div className="admin-sidebar">
            <div className="inner-admin-sidebar">
                  
                  <ul className="admin-menu">
                     
                     <li className={loc==='' ? 'active' : ''}>
                       <a href="/dashboard">
                          
                         <svg x="0px" y="0px" viewBox="0 0 64 64" width="64" height="64"><g className="nc-icon-wrapper" fill="#111111" transform="translate(0.5, 0.5)"><path data-cap="butt" data-color="color-2" fill="none" stroke="#111111" strokeWidth="3" strokeMiterlimit="10" d="M24,13.3c2.5-1.1,5.2-1.6,8-1.6 c11.2,0,20.4,9.1,20.4,20.4" strokeLinejoin="miter" strokeLinecap="butt"></path> <path data-cap="butt" data-color="color-2" fill="none" stroke="#111111" strokeWidth="3" strokeMiterlimit="10" d="M11.6,32c0-2.8,0.6-5.5,1.6-8" strokeLinejoin="miter" strokeLinecap="butt"></path> <line data-color="color-2" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="10" x1="27.8" y1="27.8" x2="16.7" y2="16.7" strokeLinejoin="miter"></line> <circle fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="10" cx="32" cy="32" r="30" strokeLinejoin="miter"></circle> <circle data-color="color-2" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="square" strokeMiterlimit="10" cx="32" cy="32" r="6" strokeLinejoin="miter"></circle></g></svg>

                          <span className="label">Dashboard</span>

                       </a>
                     </li> 


                     <li className={(loc === '/bookings') ? 'active' : ''}>
                       <a href="/dashboard/bookings">
                          
                         <svg x="0px" y="0px" viewBox="0 0 32 32" width="32" height="32"><g className="nc-icon-wrapper" fill="#ffffff"><polygon points="28 10 4 10 7 30 25 30 28 10" fill="none" stroke="#ffffff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" strokeLinejoin="miter"></polygon> <path d="M26,6a3.979,3.979,0,0,0-6.575-3.037,3.969,3.969,0,0,0-6.85,0A3.979,3.979,0,0,0,6,6" fill="none" stroke="#ffffff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" data-color="color-2" strokeLinejoin="miter"></path> <line x1="12" y1="30" x2="11" y2="10" fill="none" stroke="#ffffff" strokeMiterlimit="10" strokeWidth="2" data-cap="butt" strokeLinecap="butt"></line> <line x1="20" y1="30" x2="21" y2="10" fill="none" stroke="#ffffff" strokeMiterlimit="10" strokeWidth="2" data-cap="butt" strokeLinecap="butt"></line></g></svg>

                          <span className="label">My Subscriptions</span>

                       </a>
                     </li>

                                
                     <li className={(loc.includes('profile') ) ? 'active' : ''}>
                       <a href={"/dashboard/profile/"+this.props.user.slug}>
                          
                          <svg x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path d="M8.5,10.5h-3a5,5,0,0,0-5,5h6" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" data-cap="butt"></path> <circle cx="7" cy="4" r="3.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" data-cap="butt"></circle> <polygon points="11 15 8.5 15.5 9 13 13.5 8.5 15.5 10.5 11 15" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" data-cap="butt" data-color="color-2"></polygon></g></svg>

                          <span className="label">Profile</span>

                       </a>
                     </li>


                     <li>
                       <a href="/logout" onClick={this.logout}>
                          
                          <svg x="0px" y="0px" viewBox="0 0 64 64" width="64" height="64"><g className="nc-icon-wrapper" fill="#ffffff"><path data-cap="butt" data-color="color-2" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M22.915,26 C25.464,17.886,33.045,12,42,12c11.046,0,20,8.954,20,20s-8.954,20-20,20c-8.953,0-16.532-5.883-19.082-13.994" strokeLinejoin="miter" strokeLinecap="butt"></path> <line data-cap="butt" fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" x1="45" y1="32" x2="3" y2="32" strokeLinejoin="miter" strokeLinecap="butt"></line> <polyline fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeMiterlimit="10" points="13,42 3,32 13,22 " strokeLinejoin="miter"></polyline></g></svg>

                          <span className="label">Logout</span>

                       </a>
                     </li>

                  </ul>

            </div>
        </div>

        {admin_menu}


                </div>  

		);

	}

}


const DashboardTabbedNav = rBridge(DashboardTabbedNavStub); 

export default DashboardTabbedNav;
