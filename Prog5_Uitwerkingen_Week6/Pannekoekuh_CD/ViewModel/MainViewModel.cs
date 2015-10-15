using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Input;

namespace Pannekoekuh_CD.ViewModel
{
 
    public class MainViewModel : ViewModelBase
    {
        Model.MyContext context; 

        public ObservableCollection<PannekoekVM> Pannekoeken { get; set; }

        private PannekoekVM _selectedPannekoek;


        public PannekoekVM SelectedPannekoek
        {
            get { return _selectedPannekoek; }
            set { _selectedPannekoek = value; RaisePropertyChanged("SelectedPannekoek"); }
        }

        public ICommand AddPannekoekCommand { get; set; }
        public ICommand ClearCommand { get; set; }


        public MainViewModel()
        {
            //1. maak een context
            context = new Model.MyContext();

            
            //2. Haal je pannekoekjes uit de context
            IEnumerable<Model.Pannekoek> result = context.Pannekoeken.ToList();

            //3. Maak een VM van je pannekoek
            IEnumerable<PannekoekVM> pannekoeken = result.Select(pannekoek => new PannekoekVM(pannekoek));

            //4. Zet ze in de observable collection
            Pannekoeken = new ObservableCollection<PannekoekVM>(pannekoeken);

            SelectedPannekoek = new PannekoekVM();

            AddPannekoekCommand = new RelayCommand(addPannekoek);
            ClearCommand = new RelayCommand(clear);


            /**
             * 
             * Wat ging er fout in de demo? 
             * 
             * Ik heb geen idee. Ik heb dezelfde code nog een keer geschreven van het begin af aan, en vergeleken met wat wij hadden
             * en ik kan het verschil niet zien. 
             * 
             * Let wel op :
             * 
             * Ik heb de prop 'SelectedPannekoek' niet meer automatisch gegenereerd.
             * Deze verwijst nu naar een private field met een handmatige RaisePropertyChanged'
             * Dit hebben we ook geprobeerd in de workshop maar mocht niet baten!
             * 
             * Deze uitwerking werkt.
             * 
             */
            
        }

        private void clear()
        {
            this.SelectedPannekoek = new PannekoekVM();
        }

        public void addPannekoek()
        {
            context.Pannekoeken.Add(SelectedPannekoek.ToPannekoek());
            context.SaveChanges();
            Pannekoeken.Add(SelectedPannekoek);

            
        }
    }
}