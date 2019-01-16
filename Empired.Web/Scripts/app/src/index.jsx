import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './components/homepage/HomePage'


if(document.getElementById("reactapp")){
    ReactDOM.render(
      <HomePage /> , document.getElementById("reactapp")
    );
}
