using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Pannekoekuh_CD.ViewModel
{
    public class PannekoekVM : ViewModelBase
    {
        private Model.Pannekoek pannekoek;

        public PannekoekVM(Model.Pannekoek pannekoek)
        {
            // TODO: Complete member initialization
            this.pannekoek = pannekoek;
        }

        public PannekoekVM()
        {
            this.pannekoek = new Model.Pannekoek();
        }

        public String Smaak {
            get { return pannekoek.Smaak; }
            set { pannekoek.Smaak = value;
            RaisePropertyChanged("Smaak");
            }
        }

        public double Prijs
        {
            get { return pannekoek.Prijs; }
            set { pannekoek.Prijs = value;
            RaisePropertyChanged("Prijs");
            }
        }
        public String Nickname
        {
            get { return pannekoek.Nickname; }
            set { 
                pannekoek.Nickname = value;
                RaisePropertyChanged("Nickname");
            }
        }
        public String Grootte
        {
            get { return pannekoek.Grootte; }
            set { pannekoek.Grootte = value;
            RaisePropertyChanged("Grootte");
            }
        }
        public int AantalSmarties
        {
            get { return pannekoek.AantalSmarties; }
            set { pannekoek.AantalSmarties = value;
            RaisePropertyChanged("AantalSmarties");
            }
        }

        public Model.Pannekoek ToPannekoek()
        {
            return this.pannekoek;
        }

    }
}
