using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Dierentuin_GH.ViewModel
{
    public class ShowDetailsCommand : ICommand
    {


        public bool CanExecute(object parameter)
        {
            return true;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            DierDetails window = new DierDetails();
            window.Show();
         
        }
    }
}
