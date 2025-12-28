using BackendProject.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Driver> Drivers => Set<Driver>();
    public DbSet<Item> Items => Set<Item>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(b =>
        {
            b.Property(u => u.UserName).HasMaxLength(100).IsRequired();
            b.Property(u => u.Email).HasMaxLength(200).IsRequired();
            b.HasIndex(u => u.Email).IsUnique();
        });

        modelBuilder.Entity<Product>(b =>
        {
            b.Property(p => p.Brand).HasMaxLength(100);
            b.Property(p => p.Model).HasMaxLength(100);
            b.Property(p => p.Color).HasMaxLength(50);
            b.Property(p => p.Price).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<Order>(b =>
        {
            b.HasOne(o => o.User)
             .WithMany(u => u.Orders)
             .HasForeignKey(o => o.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            b.Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
            b.Property(o => o.PaymentStatus).HasMaxLength(20);
        });

        modelBuilder.Entity<OrderItem>(b =>
        {
            b.HasOne(oi => oi.Order)
             .WithMany(o => o.Items)
             .HasForeignKey(oi => oi.OrderId)
             .OnDelete(DeleteBehavior.Cascade);

            b.HasOne(oi => oi.Product)
             .WithMany()
             .HasForeignKey(oi => oi.ProductId)
             .OnDelete(DeleteBehavior.Restrict);

            b.Property(oi => oi.UnitPrice).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<Driver>(b =>
        {
            b.Property(d => d.Name).HasMaxLength(100).IsRequired();
            b.Property(d => d.Rating).HasColumnType("decimal(3,1)");
            b.Property(d => d.PricePerHour).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<Item>(b =>
        {
            b.Property(i => i.Name).HasMaxLength(200).IsRequired();
            b.Property(i => i.Description).HasMaxLength(500);
            b.Property(i => i.Price).HasColumnType("decimal(18,2)");
        });
    }
}


