import React from "react";

import DashboardLayout from "../../layout/dashboard_layout.js";
import CrudForm from '../../commons/crudForm';

class UserCreate extends React.Component {
  
  state = {

  config : {   

      post_type : 'User',
      title : 'User',
      indentifier : 'name',
    create_route: '/v1/api/user',
    get_route: '/v1/api/user/',
    edit_route: '/v1/api/user/',
      sidebar_title : 'Upload Avatar',
      form_elements: {

        'main': [

          { "label": "Status Update", "name": "status", "type": "select", "required": true, "options": { "unverfied": "unverfied", "verified": "verified", "subscribed": "subscribed", "block": "block", "cancelled": "cancelled" } },
          { "label": "First Name", "name": "name", "type": "text", "required": true },
          { "label": "Screen Name", "name": "screenName", "type": "text", "required": true },
          { "label": "Address", "name": "address", "type": "text", "required": true },
          { "label": "City", "name": "city", "type": "text", "required": true },
          {
            "label": "State", "name": "state", "type": "select", "options": {
              "AL": "Alabama",
              "AK": "Alaska",
              "AS": "American Samoa",
              "AZ": "Arizona",
              "AR": "Arkansas",
              "CA": "California",
              "CO": "Colorado",
              "CT": "Connecticut",
              "DE": "Delaware",
              "DC": "District Of Columbia",
              "FM": "Federated States Of Micronesia",
              "FL": "Florida",
              "GA": "Georgia",
              "GU": "Guam",
              "HI": "Hawaii",
              "ID": "Idaho",
              "IL": "Illinois",
              "IN": "Indiana",
              "IA": "Iowa",
              "KS": "Kansas",
              "KY": "Kentucky",
              "LA": "Louisiana",
              "ME": "Maine",
              "MH": "Marshall Islands",
              "MD": "Maryland",
              "MA": "Massachusetts",
              "MI": "Michigan",
              "MN": "Minnesota",
              "MS": "Mississippi",
              "MO": "Missouri",
              "MT": "Montana",
              "NE": "Nebraska",
              "NV": "Nevada",
              "NH": "New Hampshire",
              "NJ": "New Jersey",
              "NM": "New Mexico",
              "NY": "New York",
              "NC": "North Carolina",
              "ND": "North Dakota",
              "MP": "Northern Mariana Islands",
              "OH": "Ohio",
              "OK": "Oklahoma",
              "OR": "Oregon",
              "PW": "Palau",
              "PA": "Pennsylvania",
              "PR": "Puerto Rico",
              "RI": "Rhode Island",
              "SC": "South Carolina",
              "SD": "South Dakota",
              "TN": "Tennessee",
              "TX": "Texas",
              "UT": "Utah",
              "VT": "Vermont",
              "VI": "Virgin Islands",
              "VA": "Virginia",
              "WA": "Washington",
              "WV": "West Virginia",
              "WI": "Wisconsin",
              "WY": "Wyoming"
            }
          },


          { "label": "Zipcode", "name": "zipcode", "type": "text", "pattern": '^\\s*?\\d{5}(?:[-\\s]\\d{4})?\\s*?$', "required": true, "title": "Invalid Zip Code" },
          { "label": "Contact No", "name": "phone", "type": "tel", "required": true },
          { "label": "Email", "name": "email", "type": "email", "required": true },
          { "label": "Password", "name": "password", "type": "password" },

        ],

        'sidebar': [

          { "label": "Profile Image", "name": "avatar", "type": "upload", "accept": ".jpg,.png" },

        ]

      }

     } 

  }

  componentWillMount() {

  }

	render() {

		return (
                
               <DashboardLayout>

						<CrudForm config={this.state.config} history={this.props.history} params={this.props.match.params} />	
                      
               </DashboardLayout>    
  

		);


	}
}

export default UserCreate;

