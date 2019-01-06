using Empired.Web.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    //Claim Transformer
    public class UserClaimIdentity
    {
        public Guid UserId { get; private set; }
        public string LoginName { get; set; }


        public string DisplayName { get; set; }
        public static UserClaimIdentity From(IIdentity identity)
        {

            return identity != null ? new UserClaimIdentity
            {
                LoginName = identity.Name,
                DisplayName = ((System.Security.Claims.ClaimsIdentity)identity).Claims.Where(x => x.Type == "name").Select(c => c.Value).SingleOrDefault()
            } : new UserClaimIdentity();

        }
        public Guid EnsureUser(EmpiredWebContext ctx, ILogger logger = null)
        {
            if (UserId != Guid.Empty)
                return UserId;

            if (string.IsNullOrEmpty(LoginName))
                throw new InvalidOperationException("LoginName is required. The UserIdentity that this refers to was initialised correctly. Check the calling object for the IReceivesUserContext marker to see if the UserIdentity is initialised correctly.");

            var loginName = LoginName;


            //var tx = ctx.Database.BeginTransaction(IsolationLevel.Serializable);
            //using (tx)
            {
                var userIds = ctx.Users
                    .Where(x => x.LoginName == loginName)
                    .Select(x => x.UserId)
                    .ToList();

                if (userIds.Count > 1 && logger != null)
                {
                    logger.Warning("Multiple UserIds detected for {loginName}", loginName);
                }

                UserId = userIds.SingleOrDefault();

                if (UserId == Guid.Empty)
                {
                    // TODO: begin transaction ?

                    UserId = Guid.NewGuid();

                    var user = new User()
                    {
                        UserId = UserId,
                        LoginName = LoginName,
                        DisplayName = DisplayName,
                        Year = 9
                    };

                    ctx.Users.Add(user);

                    ctx.SaveChanges();

                }
            }
            return UserId;
        }
    }
}