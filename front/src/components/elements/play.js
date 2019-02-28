import React from "react";

class PlayButton extends React.Component {

      state = {



      }

      componentWillMount() {


      }

      render() {




            return (

                  <a className="video-play-button" href={ this.props.link || ""}>
                        <svg height="48px" width="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                              <title>button play</title>
                              <g>
                                    <path d="M12,43c-0.15234,0-0.30566-0.03516-0.44727-0.10547C11.21387,42.72461,11,42.37891,11,42V6 c0-0.37891,0.21387-0.72461,0.55273-0.89453c0.33789-0.16895,0.74414-0.13379,1.04688,0.09473l24,18 C36.85156,23.38867,37,23.68555,37,24s-0.14844,0.61133-0.40039,0.7998l-24,18C12.42383,42.93262,12.21191,43,12,43z" fill="#ffffff" />
                              </g>
                        </svg>
                  </a>
            );

      }

}

export default PlayButton;


