using AutoMapper;
using Empired.Web.Infrastructure.Caching;
using Empired.Web.Models;
using Empired.Web.ViewModels;
using Numero3.EntityFramework.Interfaces;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    public class UserModelProvider : CacheBase
    {
        private readonly IDbContextScopeFactory _factory;
        private readonly ILogger _logger;

        public UserModelProvider(IDbContextScopeFactory factory, ObjectCache cache, ILogger logger)
            : base(cache, logger.ForContext<UserModelProvider>())
        {
            _factory = factory;
            _logger = logger.ForContext<UserModelProvider>();
        }

        protected override TimeSpan DefaultCacheTimeSpan { get { return TimeSpan.FromDays(1d); } }

        public UserModel From(IUserContext context)
        {
            if (context == null || !context.Identity.IsAuthenticated)
                return Anonymous();

            var model = GetResultByUser(context.Identity, "UserModelProvider.From", identity =>
            {
                _logger.Debug("Transaction: UserModel Lookup {Identity}", identity.Name);
                using (var scope = _factory.CreateWithTransaction(IsolationLevel.ReadCommitted))
                {
                    try
                    {
                        var ctx = scope.DbContexts.Get<EmpiredWebContext>();
                        var userIdentity = UserClaimIdentity.From(identity);
                        var userId = userIdentity.EnsureUser(ctx, _logger);
                        var user = ctx.Users.Find(userId);
                        if (user == null)
                            return Anonymous();

                        var m = Mapper.Map<UserModel>(user);
                        return m;
                    }
                    finally
                    {
                        scope.SaveChanges();
                    }
                }
            });
            var userModel = model ?? Anonymous();
            return userModel;
        }

        public static UserModel Anonymous()
        {
            return new UserModel();
        }
    }
}