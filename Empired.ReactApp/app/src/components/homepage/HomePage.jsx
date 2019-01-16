import React from 'react';
class HomePage extends React.Component{
    constructor(props){
        super(props);
     }
   
    componentDidMount(){
        //sessionStorage.setItem("searchtext","");
    }
     

    render(){
        return(
             <div className="homePageSearch">
               Hello from Home
             </div>
        )
    }

}

export default HomePage;