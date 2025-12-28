namespace BackendProject.Core.Entities;

public class Driver
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public int ExperienceYears { get; set; }
    public decimal Rating { get; set; }
    public decimal PricePerHour { get; set; }
    public string ImageSrc { get; set; } = string.Empty;
}
