using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kapsalon_AB.Model
{
    public class MyContext : DbContext
    {
        public MyContext()
            : base("name=MijnDB")
        {

        }

        public DbSet<Ingredient> Ingredienten { get; set; }
    }
}
