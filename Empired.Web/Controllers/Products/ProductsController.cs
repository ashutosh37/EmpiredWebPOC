using Numero3.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Empired.Web.ViewModels;
using Empired.Web.Models;
using AutoMapper;
using Empired.Web.Infrastructure.BaseController;
using Empired.Web.Infrastructure.Security;

namespace Empired.Web.Controllers
{
    public class ProductsController : UiControllerBase
    {
        private IDbContextScopeFactory _factory;
        private readonly IUserContext _userContext;

        public ProductsController(IDbContextScopeFactory factory, IUserContext usercontext)
        {
            _factory = factory;
            _userContext = usercontext;
        }
        public ActionResult Index()
        {
            var model = new List<ProductViewModel>();
            using (var scope = _factory.Create())
            {
                var ctx = scope.DbContexts.Get<EmpiredWebContext>();

                var products = ctx.Products.Take(5).ToList();

                model = Mapper.Map<IEnumerable<Product>, IEnumerable<ProductViewModel>>(products).ToList();


            }
            return View(model);
        }
    }

    
}