using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    public enum AppRoles
    {
        /// <summary>
        /// 1. Anonymous: a non-logged in user. Allowed to browse, search, and view Learning Objects. Will only see a subset of all Learning Objects based on the ‘Allowable Use’ of the object.
        /// </summary>
        Anonymous,
        /// <summary>
        /// 2. Logged in: a user logged in with an edu001 account. In addition to the capabilities allowed an anonymous user, a logged in user will see the full set of Learning Objects and be able to create and edit their own Learning Objects.
        /// </summary>
        LoggedIn,
        /// <summary>
        /// 4. QA Users: Users with access to approve Learning Objects assigned to them.
        /// </summary>
        Teacher,


        SystemAdmin,
        /// <summary>
        /// A student: a logged in user with an ed002 account. No Ability to create or edit
        /// </summary>
        Student
    }
}