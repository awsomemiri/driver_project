using Microsoft.EntityFrameworkCore;
using BackendProject.Infrastructure.Data;
using BackendProject.Core.Interfaces;
using BackendProject.Infrastructure.Repositories;
using BackendProject.Infrastructure.Services;
using BackendProject.Core.Mapping;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IDriverRepository, DriverRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();

// Register services
builder.Services.AddScoped<IAuthService, AuthService>();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "YourSuperSecretKeyThatIsAtLeast32CharactersLong"))
        };
    });

builder.Services.AddAuthorization();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Auto-apply migrations on startup and seed data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    
    // Create database if it doesn't exist
    await db.Database.EnsureCreatedAsync();
    
    // Seed initial data only if database is empty
    if (!await db.Users.AnyAsync())
    {
        await SeedDatabaseAsync(db);
    }
}

app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

static async Task SeedDatabaseAsync(AppDbContext db)
{
    // Database is already clean, just seed the data

    // Create categories
    var vehiclesCategory = new BackendProject.Core.Entities.Category
    {
        Name = "רכבים"
    };

    var driversCategory = new BackendProject.Core.Entities.Category
    {
        Name = "נהגים"
    };

    var accessoriesCategory = new BackendProject.Core.Entities.Category
    {
        Name = "אביזרים"
    };

    db.Categories.AddRange(vehiclesCategory, driversCategory, accessoriesCategory);
    await db.SaveChangesAsync();

    // Create vehicles (Products)
    var vehicles = new List<BackendProject.Core.Entities.Product>
    {
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "5 Series",
            Year = 2018,
            Color = "Silver",
            Price = 507,
            ImageSrc = "/img/1.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "X3",
            Year = 2018,
            Color = "Silver",
            Price = 554,
            ImageSrc = "/img/2.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Hyundai",
            Model = "Santa Fe",
            Year = 2011,
            Color = "Blue",
            Price = 305,
            ImageSrc = "/img/3.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Toyota",
            Model = "Camry",
            Year = 2013,
            Color = "Black",
            Price = 385,
            ImageSrc = "/img/4.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Audi",
            Model = "A3",
            Year = 2015,
            Color = "Red",
            Price = 488,
            ImageSrc = "/img/5.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Audi",
            Model = "A4",
            Year = 2014,
            Color = "Silver",
            Price = 460,
            ImageSrc = "/img/6.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Kia",
            Model = "Sportage",
            Year = 2016,
            Color = "Red",
            Price = 435,
            ImageSrc = "/img/7.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Nissan",
            Model = "Rogue",
            Year = 2013,
            Color = "Silver",
            Price = 452,
            ImageSrc = "/img/8.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Volkswagen",
            Model = "Polo",
            Year = 2024,
            Color = "Silver",
            Price = 632,
            ImageSrc = "/img/9.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Mercedes",
            Model = "C-Class",
            Year = 2021,
            Color = "Silver",
            Price = 954,
            ImageSrc = "/img/10.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Toyota",
            Model = "Yaris",
            Year = 2015,
            Color = "White",
            Price = 396,
            ImageSrc = "/img/11.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Volkswagen",
            Model = "Tiguan",
            Year = 2015,
            Color = "Black",
            Price = 622,
            ImageSrc = "/img/12.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "5 Series",
            Year = 2015,
            Color = "Green",
            Price = 612,
            ImageSrc = "/img/13.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Hyundai",
            Model = "Santa Fe",
            Year = 2017,
            Color = "Black",
            Price = 346,
            ImageSrc = "/img/14.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Nissan",
            Model = "Sentra",
            Year = 2018,
            Color = "Grey",
            Price = 424,
            ImageSrc = "/img/15.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Audi",
            Model = "A3",
            Year = 2012,
            Color = "Silver",
            Price = 412,
            ImageSrc = "/img/16.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Audi",
            Model = "Q3",
            Year = 2021,
            Color = "Blue",
            Price = 613,
            ImageSrc = "/img/17.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "X5",
            Year = 2015,
            Color = "Blue",
            Price = 546,
            ImageSrc = "/img/18.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Ford",
            Model = "Mustang",
            Year = 2023,
            Color = "Blue",
            Price = 624,
            ImageSrc = "/img/19.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Nissan",
            Model = "Sentra",
            Year = 2014,
            Color = "Red",
            Price = 324,
            ImageSrc = "/img/20.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Mercedes",
            Model = "C-Class",
            Year = 2011,
            Color = "Red",
            Price = 760,
            ImageSrc = "/img/21.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Ford",
            Model = "Fiesta",
            Year = 2016,
            Color = "Blue",
            Price = 230,
            ImageSrc = "/img/22.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Ford",
            Model = "Fiesta",
            Year = 2017,
            Color = "Black",
            Price = 242,
            ImageSrc = "/img/23.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Mercedes",
            Model = "GLC",
            Year = 2024,
            Color = "White",
            Price = 930,
            ImageSrc = "/img/24.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Toyota",
            Model = "Camry",
            Year = 2020,
            Color = "Blue",
            Price = 350,
            ImageSrc = "/img/25.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Nissan",
            Model = "Altima",
            Year = 2015,
            Color = "Blue",
            Price = 210,
            ImageSrc = "/img/26.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "5 Series",
            Year = 2015,
            Color = "Silver",
            Price = 475,
            ImageSrc = "/img/27.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "BMW",
            Model = "3 Series",
            Year = 2013,
            Color = "Blue",
            Price = 424,
            ImageSrc = "/img/28.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Hyundai",
            Model = "Santa Fe",
            Year = 2022,
            Color = "Grey",
            Price = 436,
            ImageSrc = "/img/29.jfif",
            CategoryId = vehiclesCategory.Id
        },
        new BackendProject.Core.Entities.Product
        {
            Brand = "Honda",
            Model = "CR-V",
            Year = 2010,
            Color = "Black",
            Price = 206,
            ImageSrc = "/img/30.jfif",
            CategoryId = vehiclesCategory.Id
        }
    };

    db.Products.AddRange(vehicles);
    await db.SaveChangesAsync();

    // Create drivers
    var drivers = new List<BackendProject.Core.Entities.Driver>
    {
        new BackendProject.Core.Entities.Driver
        {
            Name = "שלמה",
            Age = 30,
            ExperienceYears = 13,
            Rating = 3.3m,
            PricePerHour = 368,
            ImageSrc = "/img/DraiverImg/1.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "יהונתן",
            Age = 28,
            ExperienceYears = 8,
            Rating = 4.0m,
            PricePerHour = 347,
            ImageSrc = "/img/DraiverImg/2.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "דוד",
            Age = 29,
            ExperienceYears = 11,
            Rating = 4.1m,
            PricePerHour = 368,
            ImageSrc = "/img/DraiverImg/3.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "גדליה",
            Age = 33,
            ExperienceYears = 7,
            Rating = 3.4m,
            PricePerHour = 357,
            ImageSrc = "/img/DraiverImg/4.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "בצלאל",
            Age = 51,
            ExperienceYears = 20,
            Rating = 3.6m,
            PricePerHour = 382,
            ImageSrc = "/img/DraiverImg/5.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "חנניה",
            Age = 28,
            ExperienceYears = 16,
            Rating = 4.9m,
            PricePerHour = 367,
            ImageSrc = "/img/DraiverImg/6.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "אלחנן",
            Age = 26,
            ExperienceYears = 6,
            Rating = 4.1m,
            PricePerHour = 337,
            ImageSrc = "/img/DraiverImg/7.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "מוטי",
            Age = 33,
            ExperienceYears = 9,
            Rating = 4.0m,
            PricePerHour = 322,
            ImageSrc = "/img/DraiverImg/8.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "מאיר",
            Age = 22,
            ExperienceYears = 4,
            Rating = 4.6m,
            PricePerHour = 374,
            ImageSrc = "/img/DraiverImg/9.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "שמעון",
            Age = 23,
            ExperienceYears = 2,
            Rating = 3.6m,
            PricePerHour = 304,
            ImageSrc = "/img/DraiverImg/10.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "יצחק",
            Age = 26,
            ExperienceYears = 7,
            Rating = 4.5m,
            PricePerHour = 323,
            ImageSrc = "/img/DraiverImg/11.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "יעקב",
            Age = 21,
            ExperienceYears = 1,
            Rating = 3.3m,
            PricePerHour = 375,
            ImageSrc = "/img/DraiverImg/12.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "שמחה",
            Age = 24,
            ExperienceYears = 4,
            Rating = 3.3m,
            PricePerHour = 352,
            ImageSrc = "/img/DraiverImg/13.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "אליהו",
            Age = 25,
            ExperienceYears = 5,
            Rating = 3.7m,
            PricePerHour = 317,
            ImageSrc = "/img/DraiverImg/14.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "דרור",
            Age = 66,
            ExperienceYears = 22,
            Rating = 4.0m,
            PricePerHour = 378,
            ImageSrc = "/img/DraiverImg/15.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "עמוס",
            Age = 55,
            ExperienceYears = 19,
            Rating = 4.5m,
            PricePerHour = 391,
            ImageSrc = "/img/DraiverImg/16.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "אבי",
            Age = 34,
            ExperienceYears = 13,
            Rating = 3.3m,
            PricePerHour = 386,
            ImageSrc = "/img/DraiverImg/17.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "נחמן",
            Age = 40,
            ExperienceYears = 8,
            Rating = 4.0m,
            PricePerHour = 309,
            ImageSrc = "/img/DraiverImg/18.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "ישראל",
            Age = 41,
            ExperienceYears = 12,
            Rating = 4.6m,
            PricePerHour = 317,
            ImageSrc = "/img/DraiverImg/19.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "איציק",
            Age = 34,
            ExperienceYears = 10,
            Rating = 4.7m,
            PricePerHour = 369,
            ImageSrc = "/img/DraiverImg/20.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "יוסף",
            Age = 50,
            ExperienceYears = 24,
            Rating = 4.5m,
            PricePerHour = 388,
            ImageSrc = "/img/DraiverImg/21.jpg"
        },
        new BackendProject.Core.Entities.Driver
        {
            Name = "משה",
            Age = 59,
            ExperienceYears = 37,
            Rating = 4.2m,
            PricePerHour = 347,
            ImageSrc = "/img/DraiverImg/22.jpg"
        }
    };

    db.Drivers.AddRange(drivers);
    await db.SaveChangesAsync();

    // Create accessories (Items)
    var accessories = new List<BackendProject.Core.Entities.Item>
    {
        new BackendProject.Core.Entities.Item
        {
            Name = "בוסטר לרכב",
            Description = "בוסטר התנעה מהיר לרכב",
            Price = 250,
            ImageSrc = "/img/ItemImg/1.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מחזיק פלאפון",
            Description = "מחזיק פלאפון מגנטי עם טעינה אלחוטית",
            Price = 75,
            ImageSrc = "/img/ItemImg/2.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מחזיק כוסות",
            Description = "מחזיק כוסות לרכב עם מייצב למניעת שפיכה",
            Price = 30,
            ImageSrc = "/img/ItemImg/3.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "כסאות עם מערכת מסאז'",
            Description = "כסאות יוקרתיים עם מערכת מסאז' מובנית",
            Price = 1500,
            ImageSrc = "/img/ItemImg/4.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מערכת מולטימדיה",
            Description = "מערכת מולטימדיה מתקדמת עם מסך מגע",
            Price = 800,
            ImageSrc = "/img/ItemImg/5.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מסכים למושב האחורי",
            Description = "מסכים כפולים למושב האחורי לצפייה בסרטים",
            Price = 600,
            ImageSrc = "/img/ItemImg/6.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מפיץ ריח חשמלי",
            Description = "מפיץ ריח חשמלי עם שליטה מרחוק",
            Price = 50,
            ImageSrc = "/img/ItemImg/7.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מקרר קטן לרכב",
            Description = "מקרר קומפקטי לרכב עם קירור מהיר",
            Price = 400,
            ImageSrc = "/img/ItemImg/8.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "מערכת הטענה",
            Description = "מערכת טעינה מהירה עם מספר יציאות USB",
            Price = 100,
            ImageSrc = "/img/ItemImg/9.jpg"
        },
        new BackendProject.Core.Entities.Item
        {
            Name = "ערכת מנגל לאחסון בפגאז'",
            Description = "ערכת מנגל קומפקטית לאחסון נוח ברכב",
            Price = 150,
            ImageSrc = "/img/ItemImg/10.jpg"
        }
    };

    db.Items.AddRange(accessories);
    await db.SaveChangesAsync();

    // Create sample users
    var users = new List<BackendProject.Core.Entities.User>
    {
        new BackendProject.Core.Entities.User
        {
            UserName = "john_doe",
            Email = "john@example.com",
            PasswordHash = "password123", // In real app, hash this
            CreatedAt = DateTime.UtcNow
        },
        new BackendProject.Core.Entities.User
        {
            UserName = "jane_smith",
            Email = "jane@example.com",
            PasswordHash = "password123", // In real app, hash this
            CreatedAt = DateTime.UtcNow
        }
    };

    db.Users.AddRange(users);
    await db.SaveChangesAsync();
}
