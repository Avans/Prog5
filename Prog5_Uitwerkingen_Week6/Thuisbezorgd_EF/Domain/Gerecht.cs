using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Thuisbezorgd_EF.ViewModel;

namespace Thuisbezorgd_EF.Domain
{
    //Model
    [Table("Gerecht")]
    public class Gerecht
    {
        [Key]
        public int GerechtId { get; set; }
        public String Naam { get; set; }
        public double Prijs { get; set; }

        [ForeignKey("Categorie")]
        public int CategorieId { get; set; }

        public virtual GerechtCategorie Categorie { get; set; }

    }
}
