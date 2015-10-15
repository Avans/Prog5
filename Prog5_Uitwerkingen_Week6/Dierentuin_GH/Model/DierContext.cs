using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dierentuin_GH.Model
{
    public class DierContext : DbContext
    {
        public DierContext()
            : base("name=DierContext")
        {
 
        }
   
        public DbSet<Dier> Dieren { get; set; }
    }
}
