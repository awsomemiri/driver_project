using AutoMapper;
using BackendProject.Core.DTOs;
using BackendProject.Core.Entities;
using BackendProject.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace BackendProject.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
// [Authorize] // Temporarily disabled for testing
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orders;
    private readonly IProductRepository _products;
    private readonly IDriverRepository _drivers;
    private readonly IItemRepository _items;
    private readonly IMapper _mapper;

    public OrdersController(IOrderRepository orders, IProductRepository products, IDriverRepository drivers, IItemRepository items, IMapper mapper)
    {
        _orders = orders;
        _products = products;
        _drivers = drivers;
        _items = items;
        _mapper = mapper;
    }

    private int? GetUserIdFromToken()
    {
        // Try to get from User claims first
        var userIdClaim = User.FindFirst("UserId");
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId))
        {
            Console.WriteLine($"✅ Found userId {userId} from User claims");
            return userId;
        }

        // Try to get from Authorization header
        if (Request.Headers.ContainsKey("Authorization"))
        {
            var authHeader = Request.Headers["Authorization"].ToString();
            Console.WriteLine($"🔍 Auth header exists: {authHeader.Substring(0, Math.Min(50, authHeader.Length))}...");
            
            if (authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                try
                {
                    var handler = new JwtSecurityTokenHandler();
                    var jsonToken = handler.ReadJwtToken(token);
                    var userIdValue = jsonToken.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
                    Console.WriteLine($"🔍 Found UserId claim: {userIdValue}");
                    
                    if (userIdValue != null && int.TryParse(userIdValue, out var id))
                    {
                        Console.WriteLine($"✅ Successfully extracted userId: {id}");
                        return id;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Error parsing token: {ex.Message}");
                }
            }
        }
        else
        {
            Console.WriteLine("❌ No Authorization header found");
        }

        Console.WriteLine("⚠️ No userId found, returning null");
        return null;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll(CancellationToken ct)
    {
        var orders = await _orders.GetAllAsync(ct);
        var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        
        // Fix old orders with wrong payment status
        foreach (var orderDto in orderDtos.Where(o => o.PaymentStatus == "Paid"))
        {
            orderDto.PaymentStatus = "paid";
        }
        
        return Ok(orderDtos);
    }

    [HttpGet("user")]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetByUserId(CancellationToken ct)
    {
        // Get userId from JWT token
        var userId = GetUserIdFromToken();
        
        if (!userId.HasValue)
        {
            Console.WriteLine("⚠️ No userId, returning empty list");
            // If no auth, return empty list
            return Ok(new List<OrderDto>());
        }

        Console.WriteLine($"📋 Getting orders for userId: {userId.Value}");
        // Get only orders for this user
        var orders = await _orders.GetByUserIdAsync(userId.Value, ct);
        Console.WriteLine($"📊 Found {orders.Count()} orders for userId {userId.Value}");
        var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        
        // Fix old orders with wrong payment status
        foreach (var orderDto in orderDtos.Where(o => o.PaymentStatus == "Paid"))
        {
            orderDto.PaymentStatus = "paid";
        }
        
        // Enrich order items with product details
        foreach (var orderDto in orderDtos)
        {
            foreach (var itemDto in orderDto.Items)
            {
                switch (itemDto.ItemType.ToLower())
                {
                    case "car":
                        var product = await _products.GetByIdAsync(itemDto.ProductId, ct);
                        if (product != null)
                        {
                            itemDto.ProductName = $"{product.Brand} {product.Model}";
                            itemDto.ProductImage = product.ImageSrc;
                        }
                        break;
                    case "driver":
                        var driver = await _drivers.GetByIdAsync(itemDto.ProductId, ct);
                        if (driver != null)
                        {
                            itemDto.ProductName = driver.Name;
                            itemDto.ProductImage = driver.ImageSrc;
                        }
                        break;
                    case "item":
                        var item = await _items.GetByIdAsync(itemDto.ProductId, ct);
                        if (item != null)
                        {
                            itemDto.ProductName = item.Name;
                            itemDto.ProductImage = item.ImageSrc;
                        }
                        break;
                }
            }
        }
        
        return Ok(orderDtos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetById(int id, CancellationToken ct)
    {
        var order = await _orders.GetByIdAsync(id, ct);
        if (order is null) return NotFound();
        return Ok(_mapper.Map<OrderDto>(order));
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> Create(CreateOrderDto dto, CancellationToken ct)
    {
        // Get userId from JWT token
        var userId = GetUserIdFromToken() ?? 1; // Default to 1 if no auth
        Console.WriteLine($"📦 Creating order for userId: {userId}");

        var order = new Order
        {
            UserId = userId,
            OrderDate = DateTime.UtcNow,
            PaymentStatus = "paid",
            Items = new List<OrderItem>()
        };

        decimal totalAmount = 0;

        foreach (var itemDto in dto.Items)
        {
            decimal unitPrice = 0;
            
            switch (itemDto.ItemType.ToLower())
            {
                case "car":
                    var product = await _products.GetByIdAsync(itemDto.ProductId, ct);
                    if (product is null)
                        return BadRequest($"Product with ID {itemDto.ProductId} not found");
                    unitPrice = product.Price;
                    break;
                    
                case "driver":
                    var driver = await _drivers.GetByIdAsync(itemDto.ProductId, ct);
                    if (driver is null)
                        return BadRequest($"Driver with ID {itemDto.ProductId} not found");
                    unitPrice = driver.PricePerHour;
                    break;
                    
                case "item":
                    var item = await _items.GetByIdAsync(itemDto.ProductId, ct);
                    if (item is null)
                        return BadRequest($"Item with ID {itemDto.ProductId} not found");
                    unitPrice = item.Price;
                    break;
                    
                default:
                    return BadRequest($"Invalid item type: {itemDto.ItemType}");
            }

            var orderItem = new OrderItem
            {
                ProductId = itemDto.ProductId,
                Quantity = itemDto.Quantity,
                UnitPrice = unitPrice,
                ItemType = itemDto.ItemType
            };

            order.Items.Add(orderItem);
            totalAmount += orderItem.UnitPrice * orderItem.Quantity;
        }

        order.TotalAmount = totalAmount;

        var createdOrder = await _orders.CreateAsync(order, ct);
        return CreatedAtAction(nameof(GetById), new { id = createdOrder.Id }, _mapper.Map<OrderDto>(createdOrder));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id, CancellationToken ct)
    {
        var order = await _orders.GetByIdAsync(id, ct);
        if (order is null) return NotFound();

        await _orders.DeleteAsync(id, ct);
        return NoContent();
    }
}
