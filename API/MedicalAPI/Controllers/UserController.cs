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
    public class UserController:ControllerBase
    {
        // private static List<User> user=new List<User>{
        //     new User{UserID=1,UserName="ravi",UserAge=30,UserPhoneNumber="9046767632",UserEmail="veladurai@mail.com",UserPassword="1234567",Balance=0.0},
        //     new User{UserID=2,UserName="abinash",UserAge=30,UserPhoneNumber="9046767632",UserEmail="abinash@mail.com",UserPassword="1234567",Balance=0.0},
            
        // };

        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        
        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{id}")]
         public IActionResult GetMedecine(int id)
        {
            var user = _dbContext.users.FirstOrDefaultAsync(m => m.UserID == id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] User user)
        {
            _dbContext.users.Add(user);
           _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] User user)
        {
            var userOld = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if (userOld < 0)
            {
                return NotFound();
            }
            userOld.UserName=user.UserName;
            userOld.UserAge=user.UserAge;
            userOld.UserPhoneNumber=user.UserPhoneNumber;
            userOld.UserEmail=user.UserEmail;
            userOld.UserPassword=user.UserPassword;
            userOld.Balance=user.Balance;
           _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userOld = _dbContext.users.FirstOrDefault(m => m.UserID == id);
            if (userOld == null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(userOld);
            _dbContext.SaveChanges();
            
            return Ok();
        }
    }
}