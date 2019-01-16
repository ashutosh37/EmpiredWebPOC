import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './components/homepage/HomePage'
import $ from "jquery";
if(document.getElementById("reactapp")){
    ReactDOM.render(
      <HomePage /> , document.getElementById("reactapp")
    );
}
  