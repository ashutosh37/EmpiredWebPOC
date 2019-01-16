using Empired.Web.Infrastructure.Security;
using Empired.Web.Models;
using Mehdime.Entity;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Empired.Web.Controllers.Home
{
    public class SASToken
    {


        public string SasToken { get; set; }
        public string Container { get; set; }

        public string StorageAccount { get; set; }
        //everything else



    }

    
}