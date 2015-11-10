using System.Collections.ObjectModel;
using GalaSoft.MvvmLight;
using System.Linq;
using System.Collections.Generic;

namespace Demo_EntityFramework_groepKL.ViewModel
{
   
    public class MainViewModel : ViewModelBase
    {
        /// <summary>
        /// Initializes a new instance of the MainViewModel class.
        /// </summary>

      //property waarop de datagrid is gebonden
      public ObservableCollection<BroodjeVM> Broodjes {
        get;
        set;
      }

        public MainViewModel()
        {
          // voor "stand alone" of met "dummy data".

      // effe  met dummy data
      //   Broodjes = new ObservableCollection<BroodjeVM>();
       
      // BroodjeVM puntje = new BroodjeVM(1, "pudding", "Pudding Broodje");
      // Broodjes.Add(puntje);
     

       // nu uit de database
       Model.MijnDbContext context = new Model.MijnDbContext();
       // selecteer alle records en maak daar BroodjeVM objecten van
       List<BroodjeVM> doos = context.Broodjes.ToList().Select(brood => new BroodjeVM(brood, context)).ToList();
       // stop deze verzameling in de Observable COllection waaraan de XAML is gebaonden.
       Broodjes = new ObservableCollection<BroodjeVM>(doos);


        }
    }
}