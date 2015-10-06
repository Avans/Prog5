using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MusicCollectionMVVM
{
    //The model
    public class Song
    {
        public int Id { get; set; }

        public string Artist { get; set; }

        public string Title { get; set; }
    }
}
