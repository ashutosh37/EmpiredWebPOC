using AutoMapper;
using Empired.Web.Infrastructure.BaseController;
using Empired.Web.Infrastructure.Security;
using Empired.Web.Models;
using Empired.Web.ViewModels;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OpenIdConnect;
using Numero3.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Empired.Web.Controllers
{
    
    public class HomeController : UiControllerBase
    {
        private readonly IUserContext _userContext;

        public HomeController(IUserContext userContext)
        {
            _userContext = userContext;
        }
        public ActionResult Index() {
            var userName = _userContext.UserModel;
            ViewBag.UserName = userName.DisplayName;
            return View();
        }

        public void SignIn()
        {
            if (!Request.IsAuthenticated)
            {
                HttpContext.GetOwinContext().Authentication.Challenge(
                    new AuthenticationProperties { RedirectUri = "/" },
                    OpenIdConnectAuthenticationDefaults.AuthenticationType);

                //_userContext.Initialise(HttpContext.User);
            }
        }

        public void SignOut()
        {
            HttpContext.GetOwinContext().Authentication.SignOut(
                OpenIdConnectAuthenticationDefaults.AuthenticationType,
                CookieAuthenticationDefaults.AuthenticationType);
        }
    }
}