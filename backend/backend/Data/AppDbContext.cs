using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<User> Users => Set<User>();
    public DbSet<Subscription> Subscriptions => Set<Subscription>();
    public DbSet<SubscriptionPriceHistory> SubscriptionPriceHistory => Set<SubscriptionPriceHistory>();
    public DbSet<UserPreferences> UserPreferences => Set<UserPreferences>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Budget> Budgets => Set<Budget>();
    public DbSet<DismissedNotification> DismissedNotifications => Set<DismissedNotification>();
}