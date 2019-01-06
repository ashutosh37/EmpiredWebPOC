using Autofac.Integration.Mvc;
using Empired.Web.Infrastructure.BaseController;
using Empired.Web.Infrastructure.Security;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Empired.Web.Infrastructure.Filters
{
    public class Action_InitializeUserContext_Filter : ActionFilterAttribute
    {
        //public IUserContext userContext { get; set; }
        public IUserContext userContext { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var resolver = AutofacDependencyResolver.Current;
            userContext = resolver.GetService<IUserContext>();
            if (userContext != null)
            {
                if (!userContext.IsAuthenticated)
                {
                    var controller = (UiControllerBase)filterContext.Controller;
                    filterContext.Result = controller.RedirectToAction("index", "login");
                }
                else
                {
                    try
                    {
                        userContext.Initialise(filterContext.HttpContext.User, true);
                    }
                    catch (Exception ex)
                    {
                        //if (logger != null)
                        //    logger.Error(ex, ex.Message);
                        //throw;
                    }
                }
            }
        }
    }
}