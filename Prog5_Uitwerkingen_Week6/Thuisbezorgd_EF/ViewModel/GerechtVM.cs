using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Thuisbezorgd_EF.Domain;

namespace Thuisbezorgd_EF.ViewModel
{
    public class GerechtVM : ViewModelBase
    {
        public Gerecht gerecht;

        public String Naam {
            get { return gerecht.Naam; }
            set
            {
                gerecht.Naam = value;
                RaisePropertyChanged("Naam");
            }
        }

        public double Prijs
        {
            get { return gerecht.Prijs; }
            set
            {
                gerecht.Prijs = value;
                RaisePropertyChanged("Prijs");
            }
        }


        public GerechtCategorie Categorie
        {
            get { return gerecht.Categorie; }
            set
            {
                gerecht.Categorie = value;
                RaisePropertyChanged("Categorie");
            }
        }


        public GerechtVM()
        {
            gerecht = new Gerecht();
            Categorie = new GerechtCategorie();
        }

        public GerechtVM(Gerecht gerecht)
        {
            // TODO: Complete member initialization
            this.gerecht = gerecht;
        }

    }
}
