namespace LeagueOfPresentation
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MyContext : DbContext
    {
        public MyContext()
            : base("name=TeamLadder")
        {
        }

        public virtual DbSet<Competition> Competitions { get; set; }
        public virtual DbSet<Ladder> Ladders { get; set; }
        public virtual DbSet<Player> Players { get; set; }
        public virtual DbSet<Team> Teams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Competition>()
                .HasMany(e => e.Teams)
                .WithMany(e => e.Competitions)
                .Map(m => m.ToTable("CompetitionTeam").MapRightKey("Teams_Id"));

            modelBuilder.Entity<Ladder>()
                .HasMany(e => e.Competitions)
                .WithOptional(e => e.Ladder)
                .HasForeignKey(e => e.Ladder_Id);

            modelBuilder.Entity<Team>()
                .HasMany(e => e.Players)
                .WithRequired(e => e.Team)
                .WillCascadeOnDelete(false);
        }
    }
}
