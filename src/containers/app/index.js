import React from 'react'
import { Route, Link } from 'react-router-dom'
import About from '../about'

import Currencies from '../currencies'
import NewСurrency from '../currencies/newcurrency'


const App = () => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">Курсы валют</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
      
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Главная <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newсurrency">Добавить валюту</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about-us">О проекте</Link>
          </li>
        </ul>
        
      </div>
    </div>
    </nav>

    <main role="main"className="container">
      <div className="row">
        <div className="col content">


          <Route exact path="/" component={Currencies} /> 
          <Route exact path="/about-us" component={About} /> 
          
          <Route exact path="/newсurrency" component={NewСurrency} />


        </div>
      </div>

    <br />
      
      
    </main>
  
  </div>
)

export default App
