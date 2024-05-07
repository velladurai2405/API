using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI.Data
{
    [Table("user", Schema = "public")]
    public class User
    {
        
        public int UserID { get; set; }
    public string UserName { get; set; }
    public int UserAge { get; set; }
    public string UserPhoneNumber { get; set; }
    public string UserEmail { get; set; }
    public string UserPassword { get; set; }
    public double Balance { get; set; }
    }
}