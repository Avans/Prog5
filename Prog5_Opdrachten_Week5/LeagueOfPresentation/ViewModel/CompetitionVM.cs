using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LeagueOfPresentation.ViewModel
{
    public class CompetitionVM
    {
        public DateTime Date { get; set; }

        //De rest mag je zelf aanvullen

        public CompetitionVM()
        {
            Date = new DateTime(2015, 10, 03, 14, 0, 0);
        }

        //Deze kun je later gaan gebruiken
        //public CompetitionVM(Competition comp)
        //{
        //   //Mapping
        //}
    }
}
