//import _ from 'lodash';

export const GetSaS = (callback) => {
  var spRequest = new XMLHttpRequest();
  spRequest.open('GET', "/api/home/getsas" , true)
  spRequest.setRequestHeader("Accept", "application/json ; odata=verbose");
  spRequest.withCredentials = true;
  spRequest.onreadystatechange = () => {
  
	if (spRequest.readyState === 4 && spRequest.status === 200) {
	  var result = JSON.parse(spRequest.responseText);
	  callback(result);
	}
	else if (spRequest.readyState === 4 && spRequest.status !== 200) {
	  console.log('Error Occurred !');
	}
  };
  spRequest.send();
}
