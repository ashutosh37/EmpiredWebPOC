﻿using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;
using Empired.Web.App_Start;
using System.Web.Optimization;
using Empired.Web.Infrastructure.Utilities;

namespace Empired.Web
{
    public class Global : HttpApplication
    {
        public static string CacheRequestId { get; set; }
        public static DateTime CacheInvalidation = SystemTime.Now;
        void Application_Start(object sender, EventArgs e)
        {
            var config = GlobalConfiguration.Configuration;

            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(config);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.EnsureInitialized();
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //ControllerBuilder.Current.SetControllerFactory(typeof(ControllerFactory));
            Bootstrapper.Run();
            
        }
    }
}