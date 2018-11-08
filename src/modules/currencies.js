import axios from 'axios';

export const GETCURRENCIES_REQUESTED = 'currencies/GETCURRENCIES_REQUESTED'
export const GETCURRENCIES = 'currencies/GETCURRENCIES'

export const NEWCURRENCY = 'currencies/NEWCURRENCY'
export const REMOVECURRENCY = 'currencies/REMOVECURRENCY'


export const SHOW_ERROR = 'currencies/SHOW_ERROR'
export const HIDE_ERROR = 'currencies/HIDE_ERROR'

const initialState = {
  currencies: [],
  isLoad: false,
  isError: false,
  errors: []
}

export default (state = initialState, action) => {
	
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        errors: action.errors,
		isError: true,
        isLoad: false
        
      }

    case HIDE_ERROR:
      return {
        ...state,
        errors: [],
		isError: false,
        isLoad: false
      }
      
      
    case NEWCURRENCY:
    
      return {
        ...state,
        currencies: action.currencies,
        errors: [],
		isError: false,
        isLoad: false
      }
      
    case REMOVECURRENCY:
    


      return {
        ...state,
        currencies: state.currencies.filter((obj) => 
                          !(obj.ticker.base.toLowerCase() === action.pairParameter1.toLowerCase() && obj.ticker.target.toLowerCase() === action.pairParameter2.toLowerCase())),
        errors: [],
		isError: false,
        isLoad: false
      }
      
    case GETCURRENCIES_REQUESTED:
      return {
        ...state,
        currencies: {},
        isLoad: true
        
      }

    case GETCURRENCIES:
      return {
        ...state,
        currencies: action.currencies,
        isLoad: false
      }
	  
 

    default:
      return state
  }
}

// подгружаем пары асинхронно
async function getCurrenciesQuery(callback) {
    
      let currenciesStr = localStorage.getItem('currencies'), promises = [];
      
      if(currenciesStr !== null && currenciesStr !== "") {
          
          
          let currencies = [];
          
          try {
              currencies = JSON.parse(currenciesStr);
          } catch (err) {
              console.log(err);
          }

          for(let i in currencies) {
              
              try {
                  promises.push(axios.get('https://api.cryptonator.com/api/ticker/'+ currencies[i]["base"] + '-' + currencies[i]["target"]));
              } catch (err) {
                  console.log("Network Error");
              }
          }

          let results = await Promise.all(promises);
          
          // убираем лишние данные
          results = results.map((obj) => obj.data).filter((obj) => obj.success);
          
          callback(results) 

      } else {
          
          callback([]);
      } // end if
}

export const getCurrencies = () => {
  return dispatch => {
    dispatch({
      type: GETCURRENCIES_REQUESTED
    });


    getCurrenciesQuery(function(currencies) {

        dispatch({
            type: GETCURRENCIES,
            currencies: currencies
        });
    });
    
       
  }
}


export const removeCurrency = (pairParameter1, pairParameter2) => {
  return dispatch => {
      
      let currenciesStr = localStorage.getItem('currencies'), currenciesArr = [];
      
      if(currenciesStr !== null && currenciesStr !== "") {

          currenciesArr =  JSON.parse(currenciesStr);
          

          currenciesArr = currenciesArr.filter((obj) => !(obj.base === pairParameter1.toLowerCase() && obj.target === pairParameter2.toLowerCase()))
              
          localStorage.setItem('currencies', JSON.stringify(currenciesArr));
              
          dispatch({
              type: REMOVECURRENCY,
              pairParameter1: pairParameter1,
              pairParameter2: pairParameter2
         });            
      }

	
  }
}

export const newCurrency = (pairParameter1, pairParameter2) => {
  return dispatch => {
      
      let currenciesStr = localStorage.getItem('currencies'), currenciesArr = [];
      
      if(currenciesStr === null || currenciesStr === "") {
          localStorage.setItem('currencies', JSON.stringify([{"base": pairParameter1.toLowerCase(), "target": pairParameter2.toLowerCase()}]));
      } else {
          currenciesArr =  JSON.parse(currenciesStr);
          
          // есть ли уже эта пара в локальном хранилище
          if(currenciesArr.some((obj) => obj.base === pairParameter1.toLowerCase() && obj.target === pairParameter2.toLowerCase())) {
              
              dispatch({
                  type: SHOW_ERROR,
                  errors: [{text: "Валютная пара уже создана"}]
              });
              
          } else {
              
              currenciesArr.push({"base": pairParameter1.toLowerCase(), "target": pairParameter2.toLowerCase()});
              
              localStorage.setItem('currencies', JSON.stringify(currenciesArr));
              
                  dispatch({
                      type: NEWCURRENCY,
                      currencies: currenciesArr
                  }); 
          }
          
      }

	
  }
}
