using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Empired.Web.Infrastructure.Security
{
    public class PermissionsMapper
    {
        private readonly UserContext _userContext;
        private readonly ILogger _logger;

        public PermissionsMapper(UserContext userContext, ILogger logger)
        {
            _userContext = userContext;
            _logger = logger.ForContext<PermissionsMapper>();
        }

        public bool DoesUserHavePermissions(PortalPermissions permission, AppRoles UserRole)
        {
            if (UserRole == AppRoles.SystemAdmin)
                return true;

            var isValid = UserRole != AppRoles.Anonymous && UserRole != AppRoles.Student;

            bool hasPermission = true;
            switch (permission)
            {
                case PortalPermissions.EmptyMask:
                    break;

                
            }

            if (hasPermission)
                _logger.Verbose("{LogArea}: PermissionCheck - Success : {CustomPermisson} | {UserRole} | {User}", permission, UserRole, _userContext.IdentityName);

            return hasPermission;
        }

        private PortalPermissions For(PortalPermissions permission, bool throwIfMissing = true)
        {
            PortalPermissions fuse;
            var value = permission.ToString();
            if (Enum.TryParse(value, out fuse))
                return fuse;
            if (!throwIfMissing)
                return PortalPermissions.FullControl;
            // defaults to full control if not found - ensures that any requests will require the highest permissions set.
            throw new ArgumentException(
                string.Format("Could not map PortalPermissions:{0} to FUSEPermissions Enum", permission), "permission");
        }
    }
    public enum PortalPermissions
    {
        EmptyMask = 0x00000000,

        TeacherFunctionality = 0x00000008,
        EditAllObjects = 0x00000010,
        SearchHandler = 0x00000020,
        ContentImport = 0x00000040,
        ClearCache = 0x00000400,
        ContentAdmin = 0x00000800,
        ContentArchiveAdministration = 0x00001000,
        ContentExpireAdministration = 0x00002000,
        ContentProviders = 0x00004000,
        ContentSource = 0x00008000,
        EduListBlacklist = 0x00010000,
        PropertyWeighting = 0x00020000,
        Reports = 0x00040000,
        Spotlight = 0x00080000,
        SubCategories = 0x00100000,
        SuggestASite = 0x00200000,
        BoostedContent = 0x00400000,
        ObjectHistory = 0x00800000,

        Ultranet = 0x01000000,

        CommunitySite = 0x02000000,

        EduListDownload = 0x04000000,
        BlacklistWords = 0x08000000,
        TransferOwnership = 0x10000000,
        HelpAdmin = 0x20000000,
        ContentHiddenAdministration = 0x40000000,
        FullControl = Int32.MaxValue
    }
}