using Empired.Web.Infrastructure.Security;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Empired.Web.Infrastructure.Filters
{
    public sealed class WebApi_InitializeUserContext_Filter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var requestScope = actionContext.Request.GetDependencyScope();
            var userContext = requestScope.GetService(typeof(IUserContext)) as IUserContext;
            if (userContext != null)
            {
                try
                {
                    userContext.Initialise(actionContext.RequestContext.Principal, true);
                    
                }
                catch (Exception ex)
                {
                    var logger = requestScope.GetService(typeof(ILogger)) as ILogger;
                    if (logger != null)
                        logger.ForContext<WebApi_InitializeUserContext_Filter>().Error(ex, ex.Message);
                    throw;
                }
            }

            base.OnActionExecuting(actionContext);
        }

        public override Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            var requestScope = actionContext.Request.GetDependencyScope();
            var userContext = requestScope.GetService(typeof(IUserContext)) as IUserContext;
            if (userContext != null)
            {
                try
                {
                    userContext.Initialise(actionContext.RequestContext.Principal, true);

                }
                catch (Exception ex)
                {
                    var logger = requestScope.GetService(typeof(ILogger)) as ILogger;
                    if (logger != null)
                        logger.ForContext<WebApi_InitializeUserContext_Filter>().Error(ex, ex.Message);
                    throw;
                }
            }

            return base.OnActionExecutingAsync(actionContext, cancellationToken);
        }
    }
}