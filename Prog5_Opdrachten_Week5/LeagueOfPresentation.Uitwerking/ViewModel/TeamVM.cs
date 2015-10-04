using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LeagueOfPresentation.ViewModel
{
    public class TeamVM
    {
        private Team team;

        public String Name
        {
            get
            {
                return team.Name;
            }
        }

        public TeamVM(Team team)
        {
            // TODO: Complete member initialization
            this.team = team;
        }
    }
}
