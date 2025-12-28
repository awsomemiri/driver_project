namespace BackendProject.Core.Entities;

public class Product
{
    public int Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Color { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageSrc { get; set; } = string.Empty;

    public int? CategoryId { get; set; }
    public Category? Category { get; set; }
}


