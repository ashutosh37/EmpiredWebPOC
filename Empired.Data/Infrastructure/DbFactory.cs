using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Empired.Data.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        EmpiredWebContext dbContext;

        public EmpiredWebContext Init()
        {
            return dbContext ?? (dbContext = new EmpiredWebContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
