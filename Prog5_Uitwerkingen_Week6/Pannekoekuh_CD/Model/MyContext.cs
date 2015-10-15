using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pannekoekuh_CD.Model
{
    class MyContext : DbContext
    {
  

        public DbSet<Pannekoek> Pannekoeken { get; set; }
    }
}
