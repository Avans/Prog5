namespace LeagueOfPresentation
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Ladder
    {
        public Ladder()
        {
            Competitions = new HashSet<Competition>();
        }

        public int Id { get; set; }

        [Required]
        public string Season { get; set; }

        public virtual ICollection<Competition> Competitions { get; set; }
    }
}
