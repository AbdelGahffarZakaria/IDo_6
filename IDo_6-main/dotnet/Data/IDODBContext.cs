using IDO.Models;
using Microsoft.EntityFrameworkCore;

namespace IDO.Data
{
    public class IDODBContext : DbContext
    {
        public IDODBContext(DbContextOptions<IDODBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "example@gmail.com",
                    Password = "password"
                }
              );
        }

        public DbSet<Task1> Tasks { get; set; }

        public DbSet<IDO_6.dotnet.Models.DTO> DTO { get; set; }

    }
}
