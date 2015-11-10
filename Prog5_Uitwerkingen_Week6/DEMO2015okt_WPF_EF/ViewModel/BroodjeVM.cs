using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Demo_EntityFramework_groepKL.ViewModel {
  public class BroodjeVM {
    // LET OP: deze code is uiteraard aangepast
    // nadat er het Entity Framework aan gekoppeld is.
    // met dummy data is er geen Model dat "brood" heet.

    private Model.Broodje brood;
    private Model.MijnDbContext context;

    public int ID {
      get;
      set;
    }
    public String Type {
      get {

        return brood.Type;
      }
      set {
        brood.Type = value;
        context.SaveChanges();
      }
    }

    public String Name {
      get {
        return brood.Name;
      }
      set {
        brood.Name = value;
        context.SaveChanges();
      }
    }

    // twee constructors voor de Dummy data versie
    public BroodjeVM(int newID, String newType, String newName) {
      this.ID = newID;
      this.Type = newType;
      this.Name = newName;
    }
    public BroodjeVM() {
    }


    // Constructor die erbij is gekomen vanwege het Entity Framework
    public BroodjeVM(Model.Broodje brood, Model.MijnDbContext context) {
      // TODO: Complete member initialization
      this.brood = brood;
      this.context = context;
    }
  }
}
