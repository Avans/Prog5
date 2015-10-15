using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dierentuin_GH.ViewModel
{
    public class DierVM
    {
        private Model.Dier dier;

        public String Naam
        {
            get { return dier.Naam;  }
            set
            {
                dier.Naam = value;
            }
        }

        public String Soort
        {
            get { return dier.Soort; }
            set
            {
                dier.Soort = value;
            }
        }

        public Char Geslacht
        {
            get { return dier.Geslacht; }
            set
            {
                dier.Geslacht = value;
            }
        }

        public int Leeftijd
        {
            get { return dier.Leeftijd; }
            set
            {
                dier.Leeftijd = value;
            }
        }

        public DierVM(Model.Dier dier)
        {
            // TODO: Complete member initialization
            this.dier = dier;
        }

        public DierVM()
        {
            dier = new Model.Dier();
        }

        public Model.Dier ToPOCO()
        {
            return dier;
        }
    }
}
