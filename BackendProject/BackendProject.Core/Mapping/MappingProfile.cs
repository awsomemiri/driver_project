using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;

namespace BackendProject.Core.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Product mappings
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => $"{src.Brand} {src.Model}"))
            .ReverseMap();
        CreateMap<CreateProductDto, Product>();

        // User mappings
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<CreateUserDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.Password)); // In real app, hash this
        CreateMap<UpdateUserDto, User>();

        // Order mappings
        CreateMap<Order, OrderDto>().ReverseMap();
        CreateMap<OrderItem, OrderItemDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => GetProductName(src)))
            .ForMember(dest => dest.ProductImage, opt => opt.MapFrom(src => GetProductImage(src)))
            .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.UnitPrice * src.Quantity))
            .ReverseMap();
        CreateMap<CreateOrderDto, Order>();
        CreateMap<CreateOrderItemDto, OrderItem>();

        // Category mappings
        CreateMap<Category, CategoryDto>().ReverseMap();
        CreateMap<CreateCategoryDto, Category>();

        // Driver mappings
        CreateMap<Driver, DriverDto>().ReverseMap();
        CreateMap<CreateDriverDto, Driver>();

        // Item mappings
        CreateMap<Item, ItemDto>().ReverseMap();
        CreateMap<CreateItemDto, Item>();
    }

    private static string GetProductName(OrderItem orderItem)
    {
        return orderItem.ItemType.ToLower() switch
        {
            "car" => orderItem.Product != null ? $"{orderItem.Product.Brand} {orderItem.Product.Model}" : "Unknown Car",
            "driver" => $"Driver #{orderItem.ProductId}",
            "item" => $"Item #{orderItem.ProductId}",
            _ => "Unknown Item"
        };
    }

    private static string GetProductImage(OrderItem orderItem)
    {
        return orderItem.ItemType.ToLower() switch
        {
            "car" => orderItem.Product?.ImageSrc ?? "",
            "driver" => "",
            "item" => "",
            _ => ""
        };
    }
}


