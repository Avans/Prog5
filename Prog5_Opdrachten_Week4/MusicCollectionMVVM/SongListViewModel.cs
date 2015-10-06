using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace MusicCollectionMVVM
{
    //The View Model
    public class SongListviewModel : INotifyPropertyChanged
    {
        private ISongRepository songRepository;
        private SongViewModel _songViewModel;
        public SongViewModel SelectedSong
        {
            get { return _songViewModel; }
            set
            {
                _songViewModel = value;
                OnPropertyChanged("SelectedSong");
            }
        }
        public ObservableCollection<SongViewModel> Songs { get; set; }

        public ICommand AddSong { get; set; }

        public SongListviewModel()
        {
            songRepository = new DummySongRepository();
            var songList = songRepository.ToList().Select(s => new SongViewModel(s));

            SelectedSong = new SongViewModel();
            Songs = new ObservableCollection<SongViewModel>(songList);


            AddSong = new RelayCommand(AddNewSong);
        }



        private void AddNewSong(object parameter)
        {
            var svm = new SongViewModel();

            svm.Artist = SelectedSong.Artist;
            svm.Id = SelectedSong.Id;
            svm.Title = SelectedSong.Title;

            Songs.Add(svm);
            
        }

        //Magic!

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
