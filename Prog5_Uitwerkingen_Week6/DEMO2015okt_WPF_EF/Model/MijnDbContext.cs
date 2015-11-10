using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo_EntityFramework_groepKL.Model {
  public class MijnDbContext : DbContext {

    public MijnDbContext() {
    }

    public DbSet<Broodje> Broodjes {
      get;
      set;
    }
  }
}
