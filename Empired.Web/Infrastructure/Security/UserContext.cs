using Empired.Web.ViewModels;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    public class UserContext : IUserContext
    {
        public IIdentity Identity
        {
            get
            {
                return HttpContext.Current.User.Identity;
            }

        }
        private readonly ILogger _logger;
        private readonly UserModelProvider _provider;
        public UserContext(ILogger logger , UserModelProvider provider)
        {
            _logger = logger;
            _provider = provider;
        }

        public UserModel UserModel
        {
            get
            {
                UserModel model = null;
                if (Identity.IsAuthenticated)
                {
                    model = _provider.From(this);
                }
                return model;
            }
        }
        public Guid? UserId
        {
            get
            {
                Guid userid = Guid.Empty;
                if (Identity.IsAuthenticated)
                {
                    var usermodel = _provider.From(this);
                    userid = usermodel.Id;
                }
                return userid;
            }
        }
        public virtual string IdentityName { get { return Identity != null ? Identity.Name : null; } }

        public string DisplayName
        {
            get
            {
                var usermodel = _provider.From(this);
                return usermodel.DisplayName;
            }
        }
                    
        public bool IsAuthenticated
        {
            get { return Identity != null && Identity.IsAuthenticated; }
        }
        public bool IsUserStudent
        {
            get
            {
                // NB: this is to support an explicitly set UserRole to Student (i.e. via TestContext)
                //if (UserRole == FUSERole.Student)
                //    return true;
                // NB: this is the default evaluation to see if a user is a student.
                return false;
                    //!string.IsNullOrEmpty(IdentityName) && IdentityName.ToLower().StartsWith(UserIdentity.StudentDomain);
            }
        }
        public AppRoles UserRole { get; protected set; }

        public bool IsUserQA { get; private set; }


        public bool IsUserTeacher { get; private set; }

        public virtual void Initialise(IPrincipal user, bool useExisting = false)
        {
            if (useExisting && Identity != null)
                return;

            
            UserRole = user.Identity.IsAuthenticated ? AppRoles.LoggedIn : AppRoles.Anonymous;
        }
    }
}