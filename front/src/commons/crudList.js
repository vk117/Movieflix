import React from "react";
import {ajax,ajaxMultiparts,rBridge} from '../helpers/helpers';

import { ToastContainer, toast } from 'react-toastify';
import Moment from 'react-moment';
import Ratings from "../components/ratings";

import Loader from '../components/loader';
import Select from 'react-select';

class CrudList extends React.Component {
  
  	state = {
	  	entities: false,
	  	max :0 , 
		  page : 1,
		    genre: [],
		    searching: false,
		    select: {},
		    options: {}
  	}

    componentWillMount() { }

	handleSelectChange = (name, value) => {


		var select = this.state.select;

		select[name] = value;

		this.setState({ select });
	}


    componentDidMount() {
  	 let obj = this;
		  this.makeRequest({ perPage : 10 });
		  
	    ajax({ perPage: 100 }, function (response) {

		    if (response) {


			    var o = [];
			    for (let genre of response.content) {
				    console.log(genre)
				    o.push({ label: genre.name, value: genre.id });
			    }
			    var options = {
				    "genres": o, "available_in": [
					    { label: '720', value: '720' },
					    { label: '1080P', value: '1080P' },
					    { label: '1440', value: '1440' },
					    { label: '2K', value: '2K' },
					    {
						    label: '4K', value: '4K'
					    }]
			    };

			    obj.setState({ genre: response.content, options: options });

		    }

	    }, "/v1/api/genres", "get");

    }

    paginate = (e) => {

	    e.preventDefault();
	    this.makeRequest({},false, "/"+(parseInt(e.target.dataset.paginate)-1) );
	     
	  }

	search = (e) => {

		e.preventDefault();

		this.setState({ searching: true });

		var obj = this, filter = { str: this.searchform.querySelector('.s').value };

		this.clearButton.style.display = "block";
		var genres = [];
		var available_in = [];

		if (this.state.select["genres"])
			for (let g of this.state.select["genres"]) {
				genres.push({ id: g.value })
			}

		if (genres.length > 0)
			filter["genres"] = genres;

		if (this.state.select["available_in"])
			for (let g of this.state.select["available_in"]) {
				available_in.push(g.value)
			}

		if (available_in.length > 0)
			filter["available_in"] = available_in.join(",");

		ajax(filter, function (response) {
			window.scrollTo(0, 100);

			obj.setState({ entities: response, page: 0, max: 0, searching: false });

		}, "/v1/api/movies/search", "post");

	}

	resetPagination = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.searchform.reset(0);
		this.setState({ select: { genres:[] } });
		this.makeRequest({},false,"/"+ 0);

		
	} 

  	makeRequest = (params,filter =false,paginate="") => {

		let obj = this;


  		if(this.props.config.filter !== "undefined")
  			params['filter'] = this.props.config.filter;
  		
        ajax(params,function(response){

		  obj.setState({ entities: response.content, page: response.number, max: response.totalPages });

      	}, this.props.config.index_route+paginate ,"get");

  	}

  

	render() {

		var fields = this.props.config.fields;	
		var pagination = [], cl ='';

		if(this.state.entities === false)
		return <Loader />;

	if(this.props.user.role === 'customer')
      return("You are not allowed to access this page !!");

	    for(var i=1;i<=this.state.max;i++) {
	      
	      cl = ' page-item ';

		

	      if(this.state.page+1 == i)
	        cl += ' active ';  

	      pagination.push(<li key={'p'+i} className={cl}><a onClick={this.paginate} className="page-link" data-paginate={i} href={i}>{i}</a></li>);
	                         
	    }

		return (<div>

				
		 		<div className="row ">
         

                   <div className="col-12 col-lg-12">
                       
                        <div className="fr-widget">
	                          <div className="fr-widget-body">
	                              
							<form className='search-form' ref={(f) => { this.searchform = f; }} onSubmit={this.search} action="">
								<div className="input-group">
									<input type="text" className="form-control s" placeholder="Search..." aria-label="Search by name or skills" aria-describedby="basic-addon2" />

									<Select
										className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this, "genres")}
										options={this.state.options["genres"]}
										placeholder={"Select Genres"}
										simpleValue
										value={this.state.select["genres"]}
										name={"genres"}
									/>

									<Select
										className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this, "available_in")}
										options={this.state.options["available_in"]}
										placeholder={"Select available_in"}
										simpleValue
										value={this.state.select["available_in"]}
										name={"available_in"}
									/>

									<button className="btn btn-primary" type="submit"><svg x="0px" y="0px" viewBox="0 0 16 16" width="16" height="16"><g className="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M7,14c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7S10.86,14,7,14z M7,2C4.243,2,2,4.243,2,7s2.243,5,5,5 s5-2.243,5-5S9.757,2,7,2z"></path> <path data-color="color-2" fill="#ffffff" d="M15.707,14.293L13.314,11.9c-0.411,0.529-0.885,1.003-1.414,1.414l2.393,2.393 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z"></path> </g></svg></button>

									<button className="filter-search"><svg height="32px" width="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<title>search 2</title>
										<g fill="#ffffff" stroke="#ffffff" strokeLinecap="square" strokeWidth="2">
											<line fill="none" stroke="#ffffff" x1="11" x2="2" y1="12" y2="12" />
											<line fill="none" stroke="#ffffff" x1="11" x2="2" y1="20" y2="20" />
											<line fill="none" stroke="#ffffff" x1="21" x2="2" y1="28" y2="28" />
											<line fill="none" stroke="#ffffff" x1="21" x2="2" y1="4" y2="4" />
											<circle cx="21" cy="16" fill="none" r="6" />
											<line fill="none" x1="30" x2="25.243" y1="25" y2="20.243" />
										</g>
									</svg></button>

									<button ref={(b) => { this.clearButton = b; }} style={{ display: "none" }} className=" reset-results btn btn-sm btn-outline-secondary" onClick={this.resetPagination} >Clear Results</button>
								</div>
							</form>                        
							</div>

	                     </div>
                      

                        <div className="fr-widget">
                           
                            <div className="title">
                                <h3>{this.props.config.title}</h3>
                            </div>

                            <div className="fr-widget-body no-spacing">
                              	
                              	<table className="table table-hover align-items-center">
								    <thead>
								        <tr>
								            {Object.keys(fields).map(key => <th key={key} scope="col">{fields[key].replace('_',' ').toUpperCase()}</th>)}
								        </tr>
								    </thead>
								    <tbody>
								    	 {Object.keys(this.state.entities).map(key =>
								        	this.createRow(this.state.entities[key],fields,key)
								        )}
								    </tbody>
								</table>

								<nav aria-label="Page navigation">
		                          <ul className="pagination">
		                           
		                             {pagination}
		                           
		                          </ul>
		                        </nav>

                            </div>

                        </div>
                    
                    </div>
                </div>
				 	
			</div>);

	}

	removeEntity = (event) => {

		event.preventDefault();

		 let obj = this;

		 
		 var row_el = document.querySelector(event.target.dataset.row);

		 //console.log(row_el);

	      ajax({},function(response){


	      		row_el.remove();
	        	  toast.error(obj.props.config.post_type+" has been removed !", {
            position: toast.POSITION.TOP_CENTER
          });

	      }, this.props.config.delete_route+event.target.dataset.id ,"delete");


	}

	cancelBooking = (event) => {

		event.preventDefault();

		 let obj = this;

	      ajax({},function(response){

	        	  toast.warning(obj.props.config.post_type+" has been cancelled ! Amount will be refunded in 7 working days.", {
            position: toast.POSITION.TOP_CENTER
          });

	      }, '/v1/api/cancelbooking/'+event.target.dataset.id ,"put");


	}


	createRow = (entity,fields,key) => {

		var rows = [];

		var useId = false;

		if (typeof this.props.config.useid !== "undefined" )
		  useId = true;

		  

		Object.keys(fields).map(fkey => {

			//console.log(fields[fkey]);

        	switch(fields[fkey]) {

        	

			  case 'movie_stats' :
				    var slug = entity.slug;

				    if (useId == true)
					    slug = entity.id;

					    
			  rows.push(
        						<td  className='button-panel clearfix' key={fkey}> 
					  <a href={"/dashboard/movie/stats/" + entity.id}  className="btn btn-info btn-sm ">
									    Stats
									</a>
									</td>
							  ); break;
							  
			  case 'userHistory' :
				    var slug = entity.slug;

				    if (useId == true)
					    slug = entity.id;

			  rows.push(
        						<td  className='button-panel clearfix' key={fkey}> 
					  <a href={"/dashboard/user/history/" + slug}  className="btn btn-info btn-sm ">
									    Movie History
									</a>
									</td>
        						); break;


        		case 'action' : 
				    var slug = entity.slug;

				    if (useId == true)
				    	 slug = entity.id;
							
        						rows.push(
        						<td  className='button-panel clearfix' key={fkey}> 
												  <a href={"/dashboard/" + this.props.config.post_type + "/edit/" + slug} className="btn btn-secondary btn-sm">Edit</a> 
        							<a href="" data-row={"#r"+entity.slug+"-row"} data-id={entity.id} onClick={this.removeEntity} className="btn btn-danger btn-sm ">
									    Delete
									</a>
									
									</td>
        						); break;
        		case 'avatar' :
        		case 'thumbnail' : rows.push(
        						<td key={fkey}> <img src={entity[fields[fkey]]} className="avatar avatar-lg mr-3"/></td>

        						); break;
        		case 'rating' : rows.push(<td key={fkey}><Ratings ratings={entity[fields[fkey]]} /></td>); break;
        		case 'created_at' : rows.push(<td key={fkey}>{<Moment fromNow>{entity[fields[fkey]]}</Moment>}</td>); break;
        		case 'movie_date' :
        		case 'release_date' : rows.push(<td key={fkey}>{<Moment format="DD/MM/YYYY">{entity[fields[fkey]]}</Moment>}</td>); break;
        		
        		case 'movie_name' :  
        		var mv = '-';

        		if(typeof entity.movie !== "undefined")
        			mv = entity['movie'].name;
        		
        		rows.push(<td key={'movie'-fkey}>{mv}</td>); 

        		break;

				default : rows.push(<td key={fkey}>{entity[fields[fkey]]}</td>); break;

			}

       	});
		
		return (<tr key={key} id={"r"+entity.slug+"-row"} className="bg-white" scope="row">{rows}</tr>);

	}

	

}

export default rBridge(CrudList);

