using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MusicCollectionMVVM
{
    //The View Model
    public class SongViewModel : INotifyPropertyChanged
    {

        public int Id
        {
            get { return _song.Id; }
            set { _song.Id = value; OnPropertyChanged(); }
        }


        public string Artist
        {
            get { return _song.Artist; }
            set { _song.Artist = value; OnPropertyChanged(); }
        }


        public string Title
        {
            get { return _song.Title; }
            set { _song.Title = value; OnPropertyChanged(); }
        }

        private Song _song;

        public SongViewModel()
        {
            _song = new Song();
        }


        public SongViewModel(Song song)
        {
            _song = song;
        }


        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string propertyName = "")
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
            }
        }
    }
}
