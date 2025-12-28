namespace BackendProject.Core.DTOs;

public class DriverDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public int ExperienceYears { get; set; }
    public decimal Rating { get; set; }
    public decimal PricePerHour { get; set; }
    public string ImageSrc { get; set; } = string.Empty;
}

public class CreateDriverDto
{
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public int ExperienceYears { get; set; }
    public decimal Rating { get; set; }
    public decimal PricePerHour { get; set; }
    public string ImageSrc { get; set; } = string.Empty;
}
