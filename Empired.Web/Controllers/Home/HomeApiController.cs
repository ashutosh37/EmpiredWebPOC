using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Empired.Web.Controllers.Home
{
    [Authorize]
    [Route("api/home")]
    public class HomeApiController : ApiController
    {
        [HttpGet]
        [Route("authenticate")]
        public User GetUser(string userid)
        {
            var user = new User
            {
                Name = "Ashutosh"
            };

            return user;
        }
    }

    public class User
    {
        public string Name { get; set; }
    }
}
