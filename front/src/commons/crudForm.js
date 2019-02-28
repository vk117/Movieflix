import React from "react";
import Dropzone from 'react-dropzone';
import { ajax, formHandler,rBridge} from '../helpers/helpers';

import { ToastContainer, toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import Creatable from 'react-select/lib/Creatable';

import Loader from '../components/loader';

 
class CrudMake extends React.Component {
  
  state = {
  	entity: false,
  	mode : 'create',
  	message : 'has been created!',
  	dates : {},
  	select : {},
  	options:{},
  }

  componentWillMount() {

  	this.tfiles = {};
  	this.upload_names = [];

  	var options = {};
  	let obj = this;


  	    
  }

  componentDidMount() {
  	  let obj = this;

  	  var dates = {};
	  var select = {};
	  var options = {};

	  /**
  	 * Populate entities
  	 */
	  let entity = "";
  	Object.keys(this.props.config.form_elements.main).map(key => {

		   

	  		if(this.props.config.form_elements.main[key].type === 'entity') {

					entity = this.props.config.form_elements.main[key].name;					  
  	 				ajax({ perPage : 100 },function(response){

  	 					var temp = [], select = obj.state.select;

									

  	 					Object.keys(response.content).map(k => {

  	 						temp.push({ label: response.content[k].name, value: response.content[k].id });

  	 					});

						   options[entity] = temp; 
						   
									
  	 					obj.setState({ options });	


				 }, this.props.config.entity_route,'get');

  	 			}
	  	 
	  });

	  /**
	   * Edit mode
	   */
	  
  	 if( "slug" in this.props.params ) {
  	 	
		   this.setState({ mode : 'edit' });
		   
		     var rslug = this.props.params.slug;

		     if( typeof this.props.config.myprofile !== "undefined"  ) {
			      rslug = "/"+this.props.user.id;
		     }

	    /**
	     * Get entity details
	     */
	    ajax({},function(response){

	    	var r = response;

	        obj.setState({ entity : r  });

	        Object.keys(obj.props.config.form_elements.main).map(key => {
	        	var input = obj.props.config.form_elements.main[key];
  	 			
  	 			if(input.type === 'date')
  	 				dates[input.name] = moment(r[input.name]);

			  if (typeof r[input.name] !=="undefined" && input.type === 'entity') {
  	 				
				     var tselect = [];

				      for(var i=0;i<r[input.name].length;i++){

				      	tselect.push({ value:r[input.name][i].id , label:r[input.name][i].name });

				      }

				      select[input.name] = tselect;
				  console.log(select);
  	 			}


  	 			if(input.type === 'select2') {
  	 				
  	 				options[input.name] = [];
  	 				select[input.name] = [];

 					var o = input.options;
					 var name = input.name;
					 
					r[input.name] = r[input.name].split(",");

 					Object.keys(o).map(key => {
 						options[name].push({ value : key , label : o[key] });
 					});


 					Object.keys(r[input.name]).map(k => {

 						var okey = r[input.name][k];
 						var olabel =  o[okey];

 						if(typeof o[okey] === "undefined") {
 							okey = olabel = r[input.name][k];
 						}

  	 					select[input.name].push({ label : olabel , value :okey });
  	 				});

  	 				
  	 			}


	  		 })	;

	  		 obj.setState({ dates , select, options });

	    },this.props.config.get_route+rslug,'get');

  	 } else {
  	 	
  	 	obj.setState({ entity : {}});
  	 	obj.setState({ mode : 'create' });
  	 	
  	 	Object.keys(this.props.config.form_elements.main).map(key => {

  	 		if(this.props.config.form_elements.main[key].type === 'date')
  	 			dates[this.props.config.form_elements.main[key].name] = moment();

  	 		if(this.props.config.form_elements.main[key].type === 'entity' || this.props.config.form_elements.main[key].type === 'select2') {
  	 				
  	 				options[this.props.config.form_elements.main[key].name] = [];
  	 				select[this.props.config.form_elements.main[key].name] = [];

  	 				if(this.props.config.form_elements.main[key].type === 'select2') {

  	 					var o = this.props.config.form_elements.main[key].options;
  	 					var name = this.props.config.form_elements.main[key].name;

  	 					Object.keys(o).map(key => {

  	 						options[name].push({ value : key , label : o[key] });
  	 					
  	 					});

  	 				}

  	 			}
	  	 
	  	 })	

	  	 obj.setState({ dates , select, options });

  	 }




  }


  reCheckEntities = (name,values,obj) =>{


      var options = [...this.state.options[name]];
      var select = {...this.state.select};
      var tselect = [];
      var mapped_pair = {}

      for(var i=0;i<options.length;i++)
      		mapped_pair[options[i].value] = options[i];

      for(var i=0;i<values.length;i++){

      	tselect.push(mapped_pair[values[i]]);

      }

      select[name] = tselect;

      obj.setState({ select : select  });

	}

  onDrop(name,f) {
    
    var src = f[0].preview;

    this.tfiles[name].src = src;

  }

  updateImage = (name,e) => {

	 console.log(name , e.target.value );

	 let entity = {...this.state.entity};

	 entity[name] = e.target.value;

	 this.setState({ entity  })

  }

	render() {

		

		if(this.state.mode == 'edit') {

			if( this.state.entity == false )
				return <Loader />;

		}

	// 	if(this.props.user.role === 'customer')
      // return("You are not allowed to access this page !!");

		return (<div>

				{this.createForm()}	

				 	
			</div>);

	}

	updateForm = (event) => {

		event.preventDefault();

		var submitButton = this.form.querySelector('.btn-primary') , html = submitButton.innerHTML;
		var request=  'post';
		var route = this.props.config.create_route;
	    let obj = this;

		if(this.state.mode === 'edit') {
			request = 'put';
			route = this.props.config.edit_route + this.state.entity.id;
		}

		submitButton.innerHTML = "Saving...";

		let form = formHandler(this.form);

		let ar = [] ,genreEl = document.querySelectorAll("input[name='genres']");

		for(let i=0;i<genreEl.length;i++) {
			ar[i] = { id: parseInt(genreEl[i].value) };
		}
		if (genreEl.length > 0 )
		form['genres'] = ar;

		ajax({ ...form  },function(){
		      
		      var message = obj.props.config.title+" has been created !";

		      if(obj.state.mode === 'edit')
		      	 message = obj.props.config.title+" has been updated !";

		      	submitButton.innerHTML = html;

		      toast.success(message, {
			      position: toast.POSITION.TOP_CENTER
			    });

		},route,request , window.localStorage.getItem("mtoken") );


	}

	back = (e) => {
		e.preventDefault();

		this.props.history.goBack();

	}

	createForm = () => {

		var back_button = '';

		var indentifier = ( typeof this.props.config.indentifier == "undefined" ) ? 'name' : this.props.config.indentifier;

		if("history" in this.props)
			back_button = (<a href="" className="btn btn-secondary btn-icon" onClick={this.back}><span className="btn-inner--icon"><i className="fas fa-arrow-left"></i></span><span className="btn-inner--text"> Go Back</span></a>);


		var form = (
			  <form ref={(f) => {this.form = f;} } onSubmit={this.updateForm}>

			  		<div className="row padding-50">
			  			<div className="col-12 col-lg-8">
           				    <div className="fr-widget">
                               
                                <div className="title">
                                    <h3>{ this.state.mode == 'create' ? 'Create '+this.props.config.title : 'Edit '+this.props.config.title+' : '+this.state.entity[indentifier] }</h3>
                                    {back_button}
                                </div>

                                <div className="fr-widget-body">
           							{Object.keys(this.props.config.form_elements.main).map(key => this.createInput(this.props.config.form_elements.main[key],key))}	
					  				<br/>
					  				<button className='btn btn-primary' type="submit">Submit</button>
           						</div>		
							</div>
			  			</div>	
			  			<div className="col-12 col-lg-4">
			  				<div className="fr-widget">
			  				 <div className="title">
                                    <h3>{this.props.config.sidebar_title}</h3>
                                </div>

                                <div className="fr-widget-body">
			  						{Object.keys(this.props.config.form_elements.sidebar).map(key => this.createInput(this.props.config.form_elements.sidebar[key],key))}	
			  					</div>
			  				</div>		
			  			</div>						  		
			  		</div>							  		
			  		
			  		<input type="hidden" name="cr_uploads" value={this.upload_names.join(',')} />
			  		<input type="hidden" name="cr_mode" value={this.state.mode} />
			  </form>

			);
		
		return form;
	}

	handleChange = (name,date) => {

    	var dates = this.state.dates;
  		
  		dates[name] = date;

  		console.log(date);

  		this.setState({ dates  });

  	}


  	handleSelectChange = (name,value) => {
		

		var select = this.state.select;

		select[name] = value;
		
		this.setState({ select });
	}
	


	createInput = (config,key) => {

		var multi = true,input = '';

		if( this.state.entity == false )
				return 'Loading...';



		switch(config.type) {

			case 'entity' :  

						input = ( 
							<div key={key} className="row">
								 
                                  <div className="col mb-3">
                                  <label >{config.label}</label>

                                  <Select  
                                   		className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this,config.name)}
										options={this.state.options[config.name]}
										placeholder={"Select "+config.label}
										simpleValue
										value={this.state.select[config.name]}
										name={config.name}
									/>

                                  </div>
                                 
                            </div>);
					break;	
			case 'select2' :  

						input = ( 
							<div key={key} className="row">
								 
                                  <div className="col mb-3">
                                  <label >{config.label}</label>

                                  <Creatable
                                   		className="select-selector"
										isMulti={true}
										onChange={this.handleSelectChange.bind(this,config.name)}
										options={this.state.options[config.name]}
										placeholder={"Select "+config.label}
										simpleValue
										value={this.state.select[config.name]}
										name={config.name}
									/>

                                  </div>
                                 
                            </div>);
					break;				
			case 'date' : input = ( 
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
						<DatePicker dateFormat="Y-MM-DD" selected={this.state.dates[config.name]} className="form-control" name={config.name} onChange={this.handleChange.bind(this,config.name)} />
                                </div>
                            </div>);
					break;


			case 'text' : input = ( 
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
                                	<input type="text" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />  
                                </div>
                            </div>);
					break;

			case 'tel' : input = ( 
						<div key={key} className="row">
							<div  className="col mb-3">
                            	<label >{config.label}</label>
                            	<input type="tel" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />  
                            </div>
                        </div>);
			break;

			case 'email' : input = ( 
				<div key={key} className="row">
					<div  className="col mb-3">
                    	<label >{config.label}</label>
                    	<input type="email" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } className="form-control" required={ (config.required!=="undefined" && config.required) ? config.required : false } name={config.name} title={ (config.title!=="undefined" && config.title) ? config.title : '' } pattern={ (config.pattern!=="undefined") ? config.pattern : false } />  
                    </div>
                </div>);
			break;		
			
			case 'password' : input = ( 
							<div key={key} className="row">
								<div  className="col mb-3">
                                	<label >{config.label}</label>
                                	<input type="password" defaultValue="" className="form-control" name={config.name} />  
                                </div>
                            </div>);
					break;		

			case 'textarea' : input = ( 
							<div key={key} className="row">
								 
                                  <div className="col mb-3">
                                  <label >{config.label}</label>
                                   <textarea className="form-control" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } name={config.name} id="" cols="30" rows="10"></textarea>
                                  </div>
                                 
                            </div>);
					break;
			case 'select' : input = ( 
							<div key={key} className="row">
								 
                                  <div className="col mb-3">
                                  <label >{config.label}</label>
                                   <select name={config.name} defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : '' } title={config.selectlabel} className="form-control">
                                   		{Object.keys(config.options).map( key => <option key={key} value={key}>{config.options[key]}</option> )}	
                                   </select>
                                  </div>
                                 
                            </div>);
					break;		

			case 'upload': 
				
			let img = "";
				if( config.name in this.state.entity ) {
					img = (<img src={this.state.entity[config.name]} />)
				}

				input = (
				<div key={key} className="row">
					<div className="col mb-3">
						<label >{config.label}</label>
						<input onBlur={this.updateImage.bind(this,config.name)} type="text" defaultValue={(config.name in this.state.entity) ? this.state.entity[config.name] : ''} className="form-control" required={(config.required !== "undefined" && config.required) ? config.required : false} name={config.name} title={(config.title !== "undefined" && config.title) ? config.title : ''} pattern={(config.pattern !== "undefined") ? config.pattern : false} />
						{img}
					</div>
				</div>);



					
		}

		return input;

	}

}

export default rBridge(CrudMake);

