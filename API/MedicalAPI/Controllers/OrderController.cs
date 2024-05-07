using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController:ControllerBase
    {
        //  private static List<Order> orderList = new List<Order>
        // {
        //     // Add more Contacts here if needed
        //     new Order { OrderId = 1,MedicineId=1,UserID=1 ,MedicineName = "dolo350",MedicineCount=10,OrderStatus="order" },
        //     new Order { OrderId = 2, MedicineId=2,UserID=2,MedicineName = "covaxin",MedicineCount=10,OrderStatus="order"  },
        //     new Order { OrderId = 3,MedicineId=3,UserID=3, MedicineName = "covidshield",MedicineCount=10,OrderStatus="order"  }
        // };
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(_dbContext.orders.ToList());
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetOrders(int id)
        {
            var order = _dbContext.orders.FirstOrDefaultAsync(m => m.OrderId == id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostOrder([FromBody] Order order)
        {
            _dbContext.medicines.Add(order);
            // You might want to return CreatedAtAction or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutOrder(int id, [FromBody] Order order)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(m => m.OrderId == id);
            if (orderOld < 0)
            {
                return NotFound();
            }
            orderOld.MedicineID=order.MedicineID;
            orderOld.UserID=order.UserID;
            orderOld.MedicineName=order.MedicineName;
            orderOld.MedicineCount=order.MedicineCount;
            orderOld.OrderStatus=order.OrderStatus;
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var orderOld = _dbContext.orders.FirstOrDefault(m => m.OrderId == id);
            if (orderOld == null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(orderOld);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}