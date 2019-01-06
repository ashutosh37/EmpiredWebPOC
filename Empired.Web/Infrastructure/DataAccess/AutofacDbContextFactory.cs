using Autofac;
using Numero3.EntityFramework.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Empired.Web.Infrastructure.DataAccess
{
    public class AutofacDbContextFactory : IDbContextFactory
    {
        private readonly Func<IComponentContext> _componentContext;

        public AutofacDbContextFactory(Func<IComponentContext> componentContext)
        {
            _componentContext = componentContext;
        }

        public TDbContext CreateDbContext<TDbContext>() where TDbContext : DbContext
        {
              return _componentContext().Resolve<TDbContext>();
        }
    }
}