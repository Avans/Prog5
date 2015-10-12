using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.CommandWpf;
using System.Collections.ObjectModel;
using System.Windows.Input;
using Thuisbezorgd_EF.Domain;
using System.Linq;
using System.Collections.Generic;

namespace Thuisbezorgd_EF.ViewModel
{

    public class MainViewModel : ViewModelBase
    {
        //Windows
        private AddGerecht addGerechtWindow;

        MyContext context;

        public ObservableCollection<GerechtVM> Gerechten { get; set; }

        public GerechtVM SelectedGerecht { get; set; }

        public ICommand ShowAddGerechtCommand { get; set; }
        public ICommand SaveGerechtCommand { get; set; }

        public MainViewModel()
        {
            ShowAddGerechtCommand = new RelayCommand(ShowAddGerecht);
            SaveGerechtCommand = new RelayCommand(SaveGerecht);
            SelectedGerecht = new GerechtVM();

            context = new MyContext();

            //1. ophalen gerechten
            IEnumerable<GerechtVM> gerechten = context.Gerechten
                .ToList().Select(g => new GerechtVM(g));
            Gerechten = new ObservableCollection<GerechtVM>(gerechten);

        }

        private void SaveGerecht()
        {
            Gerechten.Add(SelectedGerecht);
            context.Gerechten.Add(SelectedGerecht.gerecht);
            context.SaveChanges();
            //Voeg ook toe aan de database
            addGerechtWindow.Hide();
        }

        private void ShowAddGerecht()
        {
            SelectedGerecht = new GerechtVM();
            RaisePropertyChanged("SelectedGerecht");
            addGerechtWindow = new AddGerecht();
            addGerechtWindow.Show();
        }


    }
}