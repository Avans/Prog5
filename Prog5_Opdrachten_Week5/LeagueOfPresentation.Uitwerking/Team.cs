namespace LeagueOfPresentation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Team
    {
        public Team()
        {
            Players = new HashSet<Player>();
            Competitions = new HashSet<Competition>();
        }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Ranking { get; set; }

        public virtual ICollection<Player> Players { get; set; }

        public virtual ICollection<Competition> Competitions { get; set; }
    }
}
