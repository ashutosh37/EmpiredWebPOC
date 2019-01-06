using Empired.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    public interface IUserContext
    {
        Guid? UserId { get; }

        IIdentity Identity { get; }
        string DisplayName { get; }
        string IdentityName { get; }

        bool IsAuthenticated { get; }
        bool IsUserQA { get; }
        bool IsUserStudent { get; }
        void Initialise(IPrincipal user, bool useExisting = false);

        bool IsUserTeacher { get;}

        UserModel UserModel { get; }

    }
}