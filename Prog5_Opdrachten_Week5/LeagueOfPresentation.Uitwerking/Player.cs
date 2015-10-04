namespace LeagueOfPresentation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Player
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Gamertag { get; set; }

        public int TeamId { get; set; }

        public int Role { get; set; }

        public virtual Team Team { get; set; }
    }
}
