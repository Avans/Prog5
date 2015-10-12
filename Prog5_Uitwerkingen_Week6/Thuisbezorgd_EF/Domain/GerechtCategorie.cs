using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace Thuisbezorgd_EF.Domain
{
    [Table("GerechtCategorie")]
    public class GerechtCategorie
    {
        [Key]
        public int Id { get; set; }
        public String Name { get; set; }
    }
}
