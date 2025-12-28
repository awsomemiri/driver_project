using System.Text.Json;
using BackendProject.Core.Entities;
using BackendProject.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendProject.Infrastructure.Seed;

public class JsonSeeder
{
    private readonly AppDbContext _db;
    public JsonSeeder(AppDbContext db) => _db = db;

    public async Task SeedAllAsync(string jsonPath, CancellationToken ct = default)
    {
        if (!File.Exists(jsonPath)) return;

        var json = await File.ReadAllTextAsync(jsonPath, ct);
        var root = JsonSerializer.Deserialize<RootDto>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        if (root is null) return;

                // Seed Products
                if (root.Products is not null && !await _db.Products.AnyAsync(ct))
                {
                    var products = root.Products.Select(p => new Product
                    {
                        Brand = p.Brand,
                        Model = p.Model,
                        Year = p.Year,
                        Color = p.Color,
                        Price = p.Price,
                        ImageSrc = p.ImageSrc
                    });

                    await _db.Products.AddRangeAsync(products, ct);
                }

                // Seed Drivers
                if (root.Drivers is not null && !await _db.Drivers.AnyAsync(ct))
                {
                    var drivers = root.Drivers.Select(d => new Driver
                    {
                        Name = d.Name,
                        Age = d.Age,
                        ExperienceYears = d.ExperienceYears,
                        Rating = d.Rating,
                        PricePerHour = d.PricePerHour,
                        ImageSrc = d.ImageSrc
                    });

                    await _db.Drivers.AddRangeAsync(drivers, ct);
                }

                // Seed Items
                if (root.Items is not null && !await _db.Items.AnyAsync(ct))
                {
                    var items = root.Items.Select(i => new Item
                    {
                        Name = i.Name,
                        Description = i.Description,
                        Price = i.Price,
                        ImageSrc = i.ImageSrc
                    });

                    await _db.Items.AddRangeAsync(items, ct);
                }

        await _db.SaveChangesAsync(ct);
    }

    private class RootDto
    {
        public List<ProductJsonDto>? Products { get; set; }
        public List<DriverJsonDto>? Drivers { get; set; }
        public List<ItemJsonDto>? Items { get; set; }
    }

    private class ProductJsonDto
    {
        public int Id { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Color { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageSrc { get; set; } = string.Empty;
    }

    private class DriverJsonDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public int ExperienceYears { get; set; }
        public decimal Rating { get; set; }
        public decimal PricePerHour { get; set; }
        public string ImageSrc { get; set; } = string.Empty;
    }

    private class ItemJsonDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageSrc { get; set; } = string.Empty;
    }
}


