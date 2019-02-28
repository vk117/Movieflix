import React from "react";
import Slider from '../components/slider';
import { rBridge, ajax } from '../helpers/helpers';

import Moment from 'react-moment';
import MovieRow from '../components/movie/movieRow';
import MovieRecommended from '../components/movie/movieRecomended';
import Loader from '../components/loader';


class HomePage extends React.Component {

  state = {

  }

  componentDidMount() {



  }



  render() {


    return (

      <div className="home-page">

        <Slider />

        <div className="page-content">

          <div className="container-fluid">
            <div className="row home-row-1 padding-75">

              <div className="col-12 col-lg-12">

                <MovieRecommended guest={this.props.guest} userid={this.props.user.id} />
                <MovieRow title="Horror" slug="horror" />
                  <MovieRow title="Action" slug="action" />
                  <MovieRow title="Romance" slug="romance"/>

              </div>


            </div>
          </div>
        </div>



      </div>

    );

  }

}

export default rBridge(HomePage);

