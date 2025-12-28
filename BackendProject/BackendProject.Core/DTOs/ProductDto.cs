namespace BackendProject.Core.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty; // Will be set by mapping
    public int Year { get; set; }
    public string Color { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageSrc { get; set; } = string.Empty;
    public int? CategoryId { get; set; }
    public string? CategoryName { get; set; }
}

public class CreateProductDto
{
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Color { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageSrc { get; set; } = string.Empty;
    public int? CategoryId { get; set; }
}


