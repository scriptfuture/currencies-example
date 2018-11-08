import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getCurrencies, removeCurrency } from '../../modules/currencies'


class Currencies extends Component { 
 
  constructor() { 
       super();
       
       this.update = this.update.bind(this);
  }
  
  componentDidMount() {
      
        // получаем актуальные курсы при старте страницы
        this.props.getCurrencies(); 
        
        
  } 
  
  getCurrencies() {
	  
	  let currencies = [];
	  if(typeof this.props.currencies !== "undefined" && Array.isArray(this.props.currencies)) currencies = this.props.currencies;
	  
	  return currencies.map((curr, index) =>
			<div className="item" key={index}>

                <h3>{typeof curr.ticker !== "undefined"?curr.ticker.base:""} / {typeof curr.ticker !== "undefined"?curr.ticker.target:""}</h3>
                
                {typeof curr.ticker !== "undefined"?curr.ticker.price:""}
                
              <br />
              <button className="btn btn-danger  btn-sm" onClick={(e) => this.props.removeCurrency(curr.ticker.base, curr.ticker.target)}>
                Удалить
              </button>

			</div>
      );
  }
  
  update()  {
      
        // получаем актуальные курсы при старте страницы
        this.props.getCurrencies(); 
  }

  
  render() {
	  
	  return (
		   <div>
           
           {this.getCurrencies()}
           <div className="item-clear"></div>

            <p>
              <button className="btn btn-primary" onClick={this.update}>
                Обновить
              </button>
            </p>
          </div>
		);
  }
 
} 

const mapStateToProps = ({ currencies  }) => ({
    currencies: currencies.currencies,
    isLoad: currencies.isLoad,
    isError: currencies.isError,
    errors: currencies.errors 
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {

      getCurrencies,
      removeCurrency

    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currencies)
