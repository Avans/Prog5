namespace LeagueOfPresentation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Competition
    {
        public Competition()
        {
            Teams = new HashSet<Team>();
        }

        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int? Ladder_Id { get; set; }

        public virtual Ladder Ladder { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
    }
}
