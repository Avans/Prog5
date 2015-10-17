using GalaSoft.MvvmLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kapsalon_AB.ViewModel
{
    public class IngredientVM 
    {
        private Model.Ingredient ingredient;

        public IngredientVM(Model.Ingredient ingredient)
        {
            // TODO: Complete member initialization
            this.ingredient = ingredient;
         
        }

        public IngredientVM()
        {
            this.ingredient = new Model.Ingredient();
        }

        public String Naam
        {
            get { return ingredient.Naam; }
            set { ingredient.Naam = value; }
        }

        public double Prijs
        {
            get { return ingredient.Prijs; }
            set { ingredient.Prijs = value; }
        }

        public Model.Ingredient ToIngredient()
        {
            return this.ingredient;
        }
    }
}
