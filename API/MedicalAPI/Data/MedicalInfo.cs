using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalAPI.Data
{
    [Table("medicineinfo", Schema = "public")]
    public class MedicalInfo
    {
          public int MedicineId { get; set; }
    public string MedicineName { get; set; }
    public int MedicineCount { get; set; }
    public int MedicinePrice { get; set; }
    public string ExpairyDate { get; set; }
    }
}