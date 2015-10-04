using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LeagueOfPresentation.ViewModel
{
    public class CompetitionVM
    {
        private Competition comp;

        public DateTime Date
        {
            get
            {
                return comp.Date;
            }
        }

        //De rest mag je zelf aanvullen

        public TeamVM TeamOne { get; set; }

        public TeamVM TeamTwo { get; set; }

        //public CompetitionVM()
        //{
        //    Date = new DateTime(2015, 10, 03, 14, 0, 0);
        //}


        public CompetitionVM(Competition comp)
        {
            this.comp = comp;


            Team[] teams = comp.Teams.ToArray();

            if (teams.Length >= 2)
            {
                TeamOne = new TeamVM(teams[0]);
                TeamTwo = new TeamVM(teams[1]);
            }

        }
    }
}
