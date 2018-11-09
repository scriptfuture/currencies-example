import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Errors } from '../../components/errors/errors'
import { newCurrency } from '../../modules/currencies'


class NewNote extends Component { 
 
 
  constructor() { 
       super();
   
       this.state = {
           isSuccess: false,
           pairParameter1: "USD",
           pairParameter2: "RUR"
       };
      
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);

  } 
  
  componentDidMount() {} 
  
  handleChange(event) {

     let obj = {};
     obj[event.target.name] = event.target.value;
      
     this.setState(obj);
  }
  
  handleSubmit(event) {
        
        // добавляем новую пару валют
        this.props.newCurrency(this.state.pairParameter1, this.state.pairParameter2); 
               
        this.setState({isSuccess: true});
 
        
        event.preventDefault();
  }

  
  render() {

	

	  
	  return (
		  <div>
          
		    <h1>Новая пара валют</h1>
            <br />
            
      
            <div className={this.state.isSuccess && !this.props.isError?"alert alert-success":"alert alert-success hide"} role="alert">
              Валютная пара сохранена
            </div>
            
            <Errors isError={this.props.isError} errors={this.props.errors}/>
            
		  
			<form onSubmit={this.handleSubmit} action="#" method="post">
				<div className="form-group">
					<label htmlFor="pairParameter1">Первый параметр</label><br />
					<input type="text" id="pairParameter1" name="pairParameter1" className="form-control" value={this.state.pairParameter1} onChange={this.handleChange}/>
				</div>
                
				<div className="form-group">
					<label htmlFor="pairParameter2">Второй параметр</label><br />
					<input type="text" id="pairParameter2" name="pairParameter2" className="form-control" value={this.state.pairParameter2} onChange={this.handleChange}/>
				</div>
				
			    <p><button type="submit" className="btn btn-primary">Сохранить</button></p>
               
			</form>
            
            *Доступные параметры пар можно посмотреть по <a href="https://www.cryptonator.com/rates">ссылке</a> , среди них BTC, LTC, ETH, RUR, USD, EUR 
			

		  </div>
		);
  }
 
} 


const mapStateToProps = ({ currencies }) => ({

    isError: currencies.isError,
    errors: currencies.errors 
  
})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newCurrency,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNote)