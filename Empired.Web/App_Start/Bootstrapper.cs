using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Empired.Web.Infrastructure;
using Empired.Web.Mappings;

namespace Empired.Web.App_Start
{
    public class Bootstrapper
    {
        public static void Run()
        {


            // Configure Autofac
            AutofacWebapiConfig.Initialize(GlobalConfiguration.Configuration);
            //Configure AutoMapper
            AutoMapperConfiguration.Configure();
            
        }
    }
}