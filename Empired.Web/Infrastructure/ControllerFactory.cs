using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Empired.Web.Infrastructure
{
    public class ControllerFactory : DefaultControllerFactory
    {

        protected override Type GetControllerType(RequestContext requestContext, string controllerName)
        {
            if (controllerName == "Error")
                return typeof(ErrorController);
            return typeof(ControllerFactory).Assembly.GetType("Empired.Web.Controllers." + controllerName + ".UiController",
                false, true);
        }

        public override IController CreateController(RequestContext requestContext, string controllerName)
        {

                var httpContext = requestContext.HttpContext;
                return base.CreateController(requestContext, controllerName);

        }
    }
}