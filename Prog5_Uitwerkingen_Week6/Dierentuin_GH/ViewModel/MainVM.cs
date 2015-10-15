using Dierentuin_GH.Model;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Dierentuin_GH.ViewModel
{
    public class MainVM : ViewModelBase
    {
        public ObservableCollection<DierVM> Dieren { get; set; }

        public DierVM SelectedDier { get; set; }

        public ShowDetailsCommand ShowDetailsCommand { get; set; }

        public ICommand ShowAddDierCommand {get; set; }
        public ICommand SaveDierCommand { get; set; }

        DierContext context;

        public MainVM()
        {
            context = new DierContext();

            //1. Ophalen data uit databse
            IEnumerable<Dier> dieren = context.Dieren;

            //2. De Data omtoveren naar een VM
            IEnumerable<DierVM> dierenVM =  dieren.Select(dier => new DierVM(dier));

            //3. De data beschikbaar maken via een property
            Dieren = new ObservableCollection<DierVM>(dierenVM);

            ShowDetailsCommand = new ShowDetailsCommand();
            ShowAddDierCommand = new RelayCommand(ShowDetailsWindow);
            SaveDierCommand = new RelayCommand(SaveDier);
        }

        AddDier window;

        private void SaveDier()
        {
            Dier dier = SelectedDier.ToPOCO();
            dier = context.Dieren.Add(dier);
            context.SaveChanges();
            //Ik wil een nieuw VM omdat ik graag het nieuwe ID wil hebben
            Dieren.Add(new DierVM(dier));
            window.Hide();
        }

        public void ShowDetailsWindow()
        {
            window = new AddDier();
            SelectedDier = new DierVM();
            RaisePropertyChanged("SelectedDier");
            window.Show();
        }
    }
}
