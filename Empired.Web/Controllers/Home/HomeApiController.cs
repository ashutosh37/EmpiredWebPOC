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
using Numero3.EntityFramework.Interfaces;
using Empired.Web.Models;

namespace Empired.Web.Controllers.Home
{
    [Authorize]
    [RoutePrefix("api/home")]
    public class HomeApiController : ApiController
    {
        private readonly IUserContext _userContext;
        private readonly IDbContextScopeFactory _factory;

        public HomeApiController(IUserContext userContext , IDbContextScopeFactory factory) 
        {
            _userContext = userContext;
            _factory = factory;
        }

        [HttpGet]
        [Route("getsas")]
        public SASToken GetSasToken()
        {
            var sastoken = GetToken();

            return sastoken; 

            
        }
        public SASToken GetToken()
        {
            var userid = _userContext.UserModel.Id;
            string sharedAccessPolicyName = "userpolicy" + DateTime.Now.Ticks.ToString();
            CloudBlobContainer cloudcontainer;
            SASToken token;
            using (var scope = _factory.Create(DbContextScopeOption.ForceCreateNew))
            {
                var ctx = scope.DbContexts.Get<EmpiredWebContext>();

                var container = ctx.tbl_User_BlobContainer.SingleOrDefault(x=> x.UserId == userid);

                var containername = container != null ? container.CloudContainerName : null;

                if (containername == null)
                {
                    try
                    {
                        // create new guid and save in the database
                        containername = GetNewContainerId(userid);

                        ctx.tbl_User_BlobContainer.Add(new tbl_User_BlobContainer
                        {
                            ContainerId = Guid.NewGuid(),
                            UserId = userid,
                            CloudContainerName = containername
                        });

                        ctx.SaveChanges();

                    }
                    catch (Exception e)
                    {

                    }

                }
                cloudcontainer = GetUserContainer(containername);
                CreateSharedAccessPolicy(cloudcontainer, sharedAccessPolicyName);

                token = new SASToken();
                token.SasToken = GetContainerSasUri(cloudcontainer, sharedAccessPolicyName);
                token.Container = containername;
                token.StorageAccount = Common.CreateStorageAccountFromConnectionString().BlobEndpoint.AbsoluteUri.ToString();


            }


            return token;


        }

        private void CreateSharedAccessPolicy(CloudBlobContainer container, string policyName)
        {
            // Create a new shared access policy and define its constraints.
            // The access policy provides create, write, read, list, and delete permissions.
            SharedAccessBlobPolicy sharedPolicy = new SharedAccessBlobPolicy()
            {
                // When the start time for the SAS is omitted, the start time is assumed to be the time when the storage service receives the request. 
                // Omitting the start time for a SAS that is effective immediately helps to avoid clock skew.
                SharedAccessExpiryTime = DateTime.UtcNow.AddHours(24),
                Permissions = SharedAccessBlobPermissions.Read | SharedAccessBlobPermissions.List | SharedAccessBlobPermissions.Add | 
                    SharedAccessBlobPermissions.Write | SharedAccessBlobPermissions.Create | SharedAccessBlobPermissions.Delete
            };

            // Get the container's existing permissions.
            BlobContainerPermissions permissions = container.GetPermissions();
            permissions.SharedAccessPolicies.Clear();
            // Add the new policy to the container's permissions, and set the container's permissions.
            var sharingPolicyOnContainer = permissions.SharedAccessPolicies.FirstOrDefault(x => x.Key == policyName);
            permissions.SharedAccessPolicies.Add(policyName, sharedPolicy);
            container.SetPermissions(permissions);
        }

        private string GetNewContainerId(Guid userid)
        {
            string salt = Convert.ToString(GetSalt(10));
            string blobContainerIndentifier = userid.ToString() + salt;// + "-" + salt;

            return blobContainerIndentifier;
        }
        private int GetSalt(int maxSaltLength)
        {
            //var salt = new byte[maxSaltLength];
            var random = new RNGCryptoServiceProvider();
            return random.GetHashCode();

            
        }

        private CloudBlobContainer GetUserContainer(string containerName)
        {
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




            }

            return container;
        }

        private string GetContainerSasUri(CloudBlobContainer container, string storedPolicyName = null)
        {
            string sasContainerToken;

            // If no stored policy is specified, create a new access policy and define its constraints.
            if (storedPolicyName == null)
            {
                // Note that the SharedAccessBlobPolicy class is used both to define the parameters of an ad-hoc SAS, and 
                // to construct a shared access policy that is saved to the container's shared access policies. 
                SharedAccessBlobPolicy adHocPolicy = new SharedAccessBlobPolicy()
                {
                    // When the start time for the SAS is omitted, the start time is assumed to be the time when the storage service receives the request. 
                    // Omitting the start time for a SAS that is effective immediately helps to avoid clock skew.
                    SharedAccessExpiryTime = DateTime.UtcNow.AddHours(24),
                    Permissions = SharedAccessBlobPermissions.Write | SharedAccessBlobPermissions.List
                };

                // Generate the shared access signature on the container, setting the constraints directly on the signature.
                sasContainerToken = container.GetSharedAccessSignature(adHocPolicy, null);

                Console.WriteLine("SAS for blob container (ad hoc): {0}", sasContainerToken);
                Console.WriteLine();
            }
            else
            {
                // Generate the shared access signature on the container. In this case, all of the constraints for the
                // shared access signature are specified on the stored access policy, which is provided by name.
                // It is also possible to specify some constraints on an ad-hoc SAS and others on the stored access policy.
                sasContainerToken = container.GetSharedAccessSignature(null, storedPolicyName);
                sasContainerToken = sasContainerToken.Substring(1);
                Console.WriteLine("SAS for blob container (stored access policy): {0}", sasContainerToken);
                Console.WriteLine();
            }

            // Return the URI string for the container, including the SAS token.
            return  sasContainerToken;
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

    
}
