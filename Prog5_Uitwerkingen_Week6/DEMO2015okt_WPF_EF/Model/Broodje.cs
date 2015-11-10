using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Demo_EntityFramework_groepKL.Model {

  [Table("Bakkerij")]
  public class Broodje {

    [Key]
    public int ID {
      get;
      set;
    }
    public String Type {
      get;
      set;
    }

    public String Name {
      get;
      set;
    }
  }
}
