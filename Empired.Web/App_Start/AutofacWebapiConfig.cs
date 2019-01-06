using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using Autofac.Integration.Mvc;
using Empired.Web.Infrastructure.DataAccess;
using Empired.Web.Models;
using Numero3.EntityFramework.Implementation;

using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;
using System.Collections.Specialized;
using Serilog;
using Microsoft.ApplicationInsights.Extensibility;
using Empired.Common;
using System;
using Empired.Web.Infrastructure.Security;
using System.Runtime.Caching;

namespace Empired.Web.App_Start
{
    public class AutofacWebapiConfig
    {
        public static IContainer Container;

        public static string Environment = "Production";
        public static string EnvironmentName = "Unknown";
        public static string FileVersion = "0.0.0";
        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {

            var appSettings = System.Configuration.ConfigurationManager.AppSettings;
            var logger = BuildLogger(appSettings);
            Constants.SetLogger(logger);
            var config = new HttpConfiguration();
            try
            {
                // EF RWRSPContext
                builder.RegisterType<EmpiredWebContext>()
                .AsSelf();
                builder.RegisterType<AutofacDbContextFactory>().AsImplementedInterfaces();
                builder.RegisterType<DbContextScopeFactory>().SingleInstance().AsImplementedInterfaces();
                builder.RegisterType<AmbientDbContextLocator>().SingleInstance().AsImplementedInterfaces();
                builder.RegisterControllers(typeof(Global).Assembly);
                builder.Register((ctx) => logger).As<ILogger>().ExternallyOwned();

                builder.RegisterType<UserContext>().As<IUserContext>().InstancePerLifetimeScope();
                builder.RegisterInstance(MemoryCache.Default)
               .As<ObjectCache>()
               .SingleInstance();
                builder.RegisterType<UserModelProvider>().AsSelf();
                //builder.RegisterType<HomeController>().InstancePerRequest();

                builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
                //builder.RegisterWebApiFilterProvider(config);
                //builder.RegisterType<EmpiredWebContext>().InstancePerRequest();

                // Generic Data Repository Factory
                //builder.RegisterType<DataRepositoryFactory>()
                //.As<IDataRepositoryFactory>().InstancePerRequest();

                Container = builder.Build();
                DependencyResolver.SetResolver(new AutofacDependencyResolver(Container));//  Very important
            }
            catch(Exception ex)
            {
                logger.Fatal(ex, " Autofac Initialization failed");
            }
            return Container;
        }


        private static ILogger BuildLogger(NameValueCollection appSettings)
        {
            var loggerConfig = new LoggerConfiguration()
                .Enrich.WithMachineName()
                .Enrich.WithThreadId()
                .Enrich.WithProperty("Environment", Environment)
                .Enrich.WithProperty("Environment.Name", EnvironmentName)
                .Enrich.WithProperty("FileVersion", FileVersion)
                .WriteTo.Trace();

            var instrumentationKey = TelemetryConfiguration.Active.InstrumentationKey;
            if (string.IsNullOrEmpty(instrumentationKey))
            {
                instrumentationKey = appSettings["APPINSIGHTS_INSTRUMENTATIONKEY"] ?? "";
                TelemetryConfiguration.Active.InstrumentationKey = instrumentationKey;
            }

            if (!string.IsNullOrEmpty(instrumentationKey))
            {
                loggerConfig = loggerConfig.WriteTo
                    .ApplicationInsightsTraces(instrumentationKey);
            }

            var serverUrl = Constants.GetValue(Keys.LoggingSeqServer,"");
            if (!string.IsNullOrEmpty(serverUrl))
                loggerConfig = loggerConfig.WriteTo.Seq(serverUrl);

            var logger = loggerConfig
                .MinimumLevel.Verbose()
                .CreateLogger();

            Serilog.Log.Logger = logger;

            var l = logger.ForContext<Startup>();
            l.Verbose("----------------------------------------------------------------------------------");
            l.Information("Application Startup");
            l.Information(!string.IsNullOrEmpty(serverUrl) ? "Using SEQ" : "SEQ is not configured");
            l.Information(!string.IsNullOrEmpty(instrumentationKey) ? "Using Application Insights" : "Application Insights is not configured");

            return logger;
        }
    }
}