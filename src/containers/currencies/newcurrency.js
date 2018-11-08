import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import { Errors } from '../../components/errors/errors'
import { newCurrency } from '../../modules/currencies'


class NewNote extends Component { 
 
 
  constructor() { 
       super();
   
       this.state = {
           isSuccess: false
       };

  } 
  
  componentDidMount() {} 
  
  handleSubmit(event, self) {
        event.preventDefault();
        event.stopPropagation();

        const pairParameter1 = self.refs.pairParameter1.value;
        const pairParameter2 = self.refs.pairParameter2.value;

        
        // добавляем новую пару валют
        self.props.newCurrency(pairParameter1, pairParameter2); 
               
        self.setState({isSuccess: true});
 
        
        return false;
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
            
		  
			<form onSubmit={(e) => this.handleSubmit(e, this)} action="#" method="post">
				<div className="form-group">
					<label htmlFor="pairParameter1">Первый параметр</label><br />
					<input type="text" id="pairParameter1" name="pairParameter1" className="form-control" ref='pairParameter1' defaultValue="USD"/>
				</div>
                
				<div className="form-group">
					<label htmlFor="pairParameter2">Второй параметр</label><br />
					<input type="text" id="pairParameter2" name="pairParameter2" className="form-control" ref='pairParameter2'  defaultValue="RUR"/>
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