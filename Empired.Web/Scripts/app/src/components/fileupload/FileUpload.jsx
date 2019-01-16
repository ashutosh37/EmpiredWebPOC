
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'
import { GetSaS } from '../Common/Services';

class FileUpload extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			uploading: false,
			images: [],
			bloblist : []
		}
  }

  componentDidMount() {
	
	let self = this;
	var sasToken = sessionStorage.getItem("sasToken");
	var containerName = sessionStorage.getItem("containerName");
	var storageAccount = sessionStorage.getItem("blobUri");
	if(sasToken){
    self.GetBlobList(containerName,sasToken , storageAccount);
	}
	else{
		self.GetBlobListFromServer();
	}
	
  }

	
	GetBlobListFromServer =() => {
		GetSaS((response) => { 
			console.log(response);
			sessionStorage.setItem("sasToken", response.SasToken);
			sessionStorage.setItem("containerName", response.Container);
			sessionStorage.setItem("blobUri", response.StorageAccount);
			var containerName = response.Container;
			var sasToken = response.SasToken;
			var storageAccount = response.StorageAccount
			this.GetBlobList(containerName,sasToken , storageAccount);
         
			});
	}

	GetBlobList = (containerName,sasToken , storageAccount) =>{
		var self = this;
		var blobService = AzureStorage.Blob.createBlobServiceWithSas(storageAccount, sasToken);
		blobService.listBlobsSegmented(containerName, null, (error, results) => {
					if (error) {
							console.log(error);
					} else {
							self.setState({bloblist: []});
							results.entries.forEach(blob => {

									var link = blobService.getUrl(containerName, blob.name, sasToken);
									self.setState({bloblist: this.state.bloblist.concat([{name : blob.name , url: link}])});
									
							});

					}
			});
	}
	
  onchange(e) {

	
  }
	
	displayProcess = (process)=> {
		document.getElementById("uploadProgressBar").style.width = process + '%';
		document.getElementById("uploadProgressBar").innerHTML = process + '%';
	}
	
	refreshProgress = () => {
		setTimeout(function () {
				if (!finishedOrError) {
						var process = speedSummary.getCompletePercent();
						displayProcess(process);
						refreshProgress();
				}
		}, 200);
 }

	uploadBlob = () => {
		this.displayProcess(0);
		var self = this;
		var sasToken = sessionStorage.getItem("sasToken");
		var containerName = sessionStorage.getItem("containerName");
		var storageAccount = sessionStorage.getItem("blobUri");
		var blobService = AzureStorage.Blob.createBlobServiceWithSas(storageAccount, sasToken);
    document.getElementById("uploadProgressBarContainer").classList.remove('d-none');
		// If one file has been selected in the HTML file input element
		var file = $('#FileInput').get(0).files[0];
		console.log(file);
		var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
		blobService.singleBlobPutThresholdInBytes = customBlockSize;
    
		var finishedOrError = false;
		var speedSummary = blobService.createBlockBlobFromBrowserFile(containerName, file.name, file, { blockSize: customBlockSize }, function (error, result, response) {
				finishedOrError = true;
				if (error) {
						alert('Error');
				} else {
						self.displayProcess(100);
						var link = blobService.getUrl(containerName, file.name, sasToken);
            self.setState({bloblist: self.state.bloblist.concat([{name : file.name , url: link}])});
				}


		});

		this.refreshProgress();
}

  render() {
	return (
	<div className='fadein'>
		<div className='button'>
		  <label htmlFor='multi'>
			<FontAwesomeIcon icon={faImages} color='#6d84b4' size='5x' />
		  </label>
		  <input type='file' id="FileInput" multiple />
			<button type="button" value="Upload to Blob" className="btn btn-default" id="UploadBlob" onClick={(e) => this.uploadBlob(e)}>Upload to Blob</button>
			<div className="form-group d-none" id="uploadProgressBarContainer">
								Uploading...
								<div className="progress">
										<div className="progress-bar" role="progressbar" id="uploadProgressBar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:0}}>
												0%
										</div>
								</div>
			</div>
		</div>
		<ul>
		{
			this.state.bloblist.map((listitem, index) => 
			{ 
				return (
					<li key={index}><a href={listitem.url}>{listitem.name}</a></li>
				);
			})
		}
		</ul>
  </div>
	)
  }
}

export default FileUpload;
