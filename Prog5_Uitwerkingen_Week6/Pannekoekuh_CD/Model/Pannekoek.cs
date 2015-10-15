using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Pannekoekuh_CD.Model
{
    [Table("Pannekoek")]
    public class Pannekoek
    {
        [Key]
        public int Id { get; set; }

        public String Smaak { get; set; }

        public double Prijs { get; set; }

        public String Grootte { get; set; }

        public String Nickname { get; set; }

        public int AantalSmarties { get; set; }
    }
}
