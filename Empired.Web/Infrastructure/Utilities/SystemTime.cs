using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Empired.Web.Infrastructure.Utilities
{
    public class SystemTime
    {
        public static Func<DateTime> Provider = () => DateTime.UtcNow;

        public static DateTime Now
        {
            get { return Provider(); }
        }
    }
}