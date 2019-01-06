using Empired.Web.Infrastructure.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Empired.Web.Infrastructure.BaseController
{
    [Action_InitializeUserContext_Filter]
    public class UiControllerBase: Controller
    {
        public new RedirectToRouteResult RedirectToAction(string action, string controller)
        {
            return base.RedirectToAction(action, controller);
        }
    }
}