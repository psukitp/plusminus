using Microsoft.EntityFrameworkCore;
using plusminus.Models;

namespace plusminus.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Expenses> Expenses => Set<Expenses>();
        public DbSet<Incomes> Incomes => Set<Incomes>();
        public DbSet<CategoryExpenses> CategoryExpenses => Set<CategoryExpenses>();
        public DbSet<CategoryIncomes> CategoryIncomes => Set<CategoryIncomes>();
        public DbSet<UserSettings> UserSettings => Set<UserSettings>();
    }
}
