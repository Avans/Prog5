using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Windows.Input;
using System.Linq;

namespace Kapsalon_AB.ViewModel
{
   
    public class MainViewModel : ViewModelBase
    {
        public string Tekstje { get; set; }

        private IngredientVM _selectedIngredient { get; set; }
        public IngredientVM SelectedIngredient
        {
            get { return _selectedIngredient; }
            set { 
                _selectedIngredient = value;
                RaisePropertyChanged("SelectedIngredient");
            }
        }

        public ObservableCollection<IngredientVM> Ingredienten { get; set; }

        public ObservableCollection<IngredientVM> Samenstelling { get; set; }

        //Is een ICommand want RelayCommand voldoet aan de interface ICommand
        //public RelayCommand AddIngredientCommand {get; set; } mag ook!
        public ICommand AddIngredientCommand { get; set; }
        public ICommand RemoveIngredientCommand { get; set; }

        public ICommand SaveIngredientCommand { get; set; }

        Model.MyContext context;

        public MainViewModel()
        {
            //commands
            AddIngredientCommand = new RelayCommand(AddIngredietToSamenstelling);
            RemoveIngredientCommand = new RelayCommand(RemoveIngredietFromSamenstelling);
            SaveIngredientCommand = new RelayCommand(SaveIngredient);


            context  = new Model.MyContext();

            List<Model.Ingredient> tijdelijkeIngredienten = context.Ingredienten.ToList(); 

            //omzetten ingredienten naar viewmodels?
            Ingredienten = new ObservableCollection<IngredientVM>(tijdelijkeIngredienten.Select(ingredient => new IngredientVM(ingredient)));

           
            //Lijst van ingredienten
            SelectedIngredient = new IngredientVM();
           
            Samenstelling = new ObservableCollection<IngredientVM>();

        }

        private void SaveIngredient()
        {
            //??? Wat nu?
            //Ingredienten.Add(SelectedIngredient);
            //context.Ingredienten.Add(SelectedIngredient.ToIngredient());
            //context.SaveChanges();
            AddIngredient window = new AddIngredient();
            window.Show();

        }

        private void RemoveIngredietFromSamenstelling()
        {
            Samenstelling.Remove(SelectedIngredient);
        }

        public void AddIngredietToSamenstelling()
        {
            Samenstelling.Add(SelectedIngredient);
        }
    }
}