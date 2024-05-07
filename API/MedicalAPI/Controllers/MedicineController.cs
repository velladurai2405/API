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
    public class MedicineController:ControllerBase
    {
       private readonly ApplicationDBContext _dbContext;
       public MedicineController(ApplicationDBContext applicationDBContext)
       {
        _dbContext=applicationDBContext;
       }
        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetMedicine()
        {
            return Ok(_dbContext.medicines.ToList());
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(int id)
        {
            var medicine = _dbContext.medicines.FirstOrDefaultAsync(m => m.MedicineId == id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostMedicine([FromBody] MedicalInfo medicine)
        {
            _dbContext.medicines.Add(medicine);
            // You might want to return CreatedAtAction or another appropriate response
            _dbContext.SaveChanges();
            return Ok();
            
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id, [FromBody] MedicalInfo medicine)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(m => m.MedicineId == id);
            if (medicineOld < 0)
            {
                return NotFound();
            }
           
            medicineOld.MedicineCount=medicine.MedicineCount;
            medicineOld.ExpairyDate=medicine.ExpairyDate;
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.MedicinePrice=medicine.MedicinePrice;
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(m => m.MedicineId == id);
            if (medicineOld == null)
            {
                return NotFound();
            }
            _dbContext.medicines.Remove(medicineOld);
            _dbContext.SaveChanges();
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}