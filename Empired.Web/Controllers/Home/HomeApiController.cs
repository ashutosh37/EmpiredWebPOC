using Empired.Web.Infrastructure.Security;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.RetryPolicies;

namespace Empired.Web.Controllers.Home
{
    [Authorize]
    [RoutePrefix("api/home")]
    public class HomeApiController : ApiController
    {
        private readonly IUserContext _userContext;

        public HomeApiController(IUserContext userContext) 
        {
            _userContext = userContext;
        }

        [HttpGet]
        [Route("getsas")]
        public SASToken GetSasToken()
        {
            //Get User Container from data base , if not exixts then generate new one and save in DB
            //Check if conrtainer exists in Bl;ob Storage, if not generate it
            //get container SAS
            //return container name along with sas 

            

            return null;
        }
        [HttpGet]
        [Route("authenticate")]
        public User GetUser(string userid)
        {
            var user = new User
            {
                Name = "Ashutosh"
            };

            return user;
        }

        [HttpPost]
        [Route("uploadfile")]
        public string UploadFile([FromBody] UserFile userFile) 
        {
            //null check values 


            string fileName = userFile.Name;
            var fileData = userFile.File;
            Guid? userID = _userContext.UserId;
            var result = "";
            //check if user has a BlobContainerIndentifier in database table by user id


            //if user BlobContainerIndentifier does not exist in DB. then create salt and save in the database
            string salt = Convert.ToBase64String(GetSalt(16));
            string blobContainerIndentifier = userID.ToString();// + "-" + salt;
                       
            //access the blob storage container
            try {
                UploadFileToBlobStorageAsync(blobContainerIndentifier, userFile).Wait();
                //if student container does not exist then create a new container with userID inside blob
                result = "Successfully added the resources to Azure storage";

                //upload the file to blob storage. 

                //return response
                //return Ok();
            } catch (Exception e){
                result = "Error while added the resources to storage: " + e.Message;
                // log exception
               // var message = e.Message;
                //return response
                //return InternalServerError();
            }

            return result;
        }

        /// <summary>
        /// Basic operations to work with page blobs
        /// </summary>
        /// <returns>A Task object.</returns>
        private async Task UploadFileToBlobStorageAsync(string containerName, UserFile userFile) {
            string PageBlobName = userFile.Name;
            //string containerName = ContainerPrefix + Guid.NewGuid();

            // Retrieve storage account information from connection string
            CloudStorageAccount storageAccount = Common.CreateStorageAccountFromConnectionString();

            // Create a blob client for interacting with the blob service.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Create a container for organizing blobs within the storage account.
            Console.WriteLine("1. Creating Container");
            CloudBlobContainer container = blobClient.GetContainerReference(containerName);
            //bool exist = container.Exists();

            if (!container.Exists())
            {
                container.CreateIfNotExists();
                //await container.CreateIfNotExistsAsync();
                //container.CreateIfNotExistsAsync().Wait();
            }

            //var result = await container.CreateIfNotExistsAsync();

            // Create a page blob in the newly created container.  
            Console.WriteLine("2. Creating Page Blob");
            CloudPageBlob pageBlob = container.GetPageBlobReference(PageBlobName);
            if (!pageBlob.Exists())
            {
                pageBlob.Create(512 * 2 /*size*/);
                //await pageBlob.CreateAsync(512 * 2 /*size*/);
                //pageBlob.CreateAsync(512 * 2 /*size*/).Wait(); // size needs to be multiple of 512 bytes
            }

            // Write to a page blob 
            Console.WriteLine("2. Write to a Page Blob");
            byte[] samplePagedata = userFile.File;//new byte[512];
            Random random = new Random();
            random.NextBytes(samplePagedata);

            pageBlob.UploadFromByteArray(samplePagedata, 0, samplePagedata.Length);
            //await pageBlob.UploadFromByteArrayAsync(samplePagedata, 0, samplePagedata.Length);
            //pageBlob.UploadFromByteArrayAsync(samplePagedata, 0, samplePagedata.Length).Wait();

            // List all blobs in this container. Because a container can contain a large number of blobs the results 
            // are returned in segments with a maximum of 5000 blobs per segment. You can define a smaller maximum segment size
            // using the maxResults parameter on ListBlobsSegmentedAsync.
            //Console.WriteLine("3. List Blobs in Container");
            BlobContinuationToken token = null;
            do
            {
                BlobResultSegment resultSegment = container.ListBlobsSegmented(token);
                //BlobResultSegment resultSegment = await container.ListBlobsSegmentedAsync(token);
                token = resultSegment.ContinuationToken;
                foreach (IListBlobItem blob in resultSegment.Results)
                {
                    // Blob type will be CloudBlockBlob, CloudPageBlob or CloudBlobDirectory
                    Console.WriteLine("{0} (type: {1}", blob.Uri, blob.GetType());
                }
            }
            while (token != null);

            // Read from a page blob
            Console.WriteLine("4. Read from a Page Blob");
            int bytesRead = pageBlob.DownloadRangeToByteArray(samplePagedata, 0, 0, samplePagedata.Count());
        }

        private byte[] GetSalt(int maxSaltLength)
        {
            var salt = new byte[maxSaltLength];
            using (var random = new RNGCryptoServiceProvider())
            {
                random.GetNonZeroBytes(salt);
            }

            return salt;
        }
    }

    public static class Common 
    {
        /// <summary>
        /// Validates the connection string information in app.config and throws an exception if it looks like 
        /// the user hasn't updated this to valid values. 
        /// </summary>
        /// <returns>CloudStorageAccount object</returns>
        public static CloudStorageAccount CreateStorageAccountFromConnectionString()
        {
            CloudStorageAccount storageAccount;
            const string Message = "Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the sample.";

            try
            {
                storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            }
            catch (FormatException)
            {
                Console.WriteLine(Message);
                Console.ReadLine();
                throw;
            }
            catch (ArgumentException)
            {
                Console.WriteLine(Message);
                Console.ReadLine();
                throw;
            }

            return storageAccount;
        }
    }

    public class User
    {
        public string Name { get; set; }
    }

    public class UserFile 
    {
        public string Name;

        //public string Image;
        public byte[] File;
    }
}
