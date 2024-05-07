using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.EntityFrameworkCore;


namespace MedicalAPI.Controllers
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        public Dbset<User> users {get; set;}
        public Dbset<MedicalInfo> medicines {get; set;}
        public Dbset<Order> orders {get; set;}
    }

    
}