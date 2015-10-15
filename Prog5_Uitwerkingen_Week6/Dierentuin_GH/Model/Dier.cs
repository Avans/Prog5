using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Dierentuin_GH.Model
{
    [Table("Dier")]
    public class Dier
    {
        [Key]
        public int Id { get; set; }

        public String Soort { get; set; }

        public int Leeftijd { get; set; }

        public String Naam { get; set; }

        public char Geslacht { get; set; }
    }
}
