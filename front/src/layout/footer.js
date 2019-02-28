import React from "react";
import {ajax,rBridge,logAnalytics} from '../helpers/helpers';

class Footer extends React.Component {

  state = {

    genre : []
  }
	
  componentDidMount() {

        /**
         * Log only for non admin users
         */
        if(window.logMovieFlix_Analytics === true) {

      
        //   ajax({ },function(response){
                
        //        Object.keys(response).map(key => {

        //           window.MovieFlix_Analytics[key] = response[key];

        //        });

        //         window.MovieFlix_Analytics["referrer"] = document.referrer;
        //         window.MovieFlix_Analytics["current"] = window.location.href;
        //         window.MovieFlix_Analytics["time"] = Date.now();
        //         window.MovieFlix_Analytics["message"] = "Page Enter";

        //         logAnalytics();

        //     },"https://ipinfo.io/json","get");

          document.body.addEventListener('click', function(e){

                  window.MovieFlix_Analytics.clicks++;

                  var x = Math.round((e.pageX / window.innerWidth) * 100) , y = Math.round((e.pageY / window.innerHeight) * 100);

                  window.MovieFlix_Analytics["area_monitor"].push({x,y});

           }, true); 

          window.onbeforeunload = function (e) {
           
               window.MovieFlix_Analytics["time"] = Date.now();
               window.MovieFlix_Analytics["message"] = "Page Leave";
               logAnalytics();
           
          };

       }


   }  



  render() {

    if(window.logMovieFlix_Analytics === false || this.state.genre.elgnth === 0) {
      return null;
    }

  


		return null;

	}

}

export default rBridge(Footer);

