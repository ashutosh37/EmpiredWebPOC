import React from 'react';
import ReactDOM from 'react-dom'
import FileUpload from '../fileupload/FileUpload'

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
								<FileUpload />
             </div>
					   
        )
    }

}

export default HomePage;
