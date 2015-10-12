using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Thuisbezorgd_EF.Domain
{
    public class MyContext : DbContext
    {
        public DbSet<Gerecht> Gerechten { get; set; }

        public DbSet<GerechtCategorie> GerechtCategorie { get; set; }
    }
}
