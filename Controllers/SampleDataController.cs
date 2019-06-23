using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<PhoneBook> Phones()
        {
            return data;
            /*
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new PhoneBook
            {
                Name = Summaries[rng.Next(Summaries.Length)],
                Room = rng.Next(1, 55),
                Phone = rng.Next(100, 555).ToString()
            }); ;
            */
        }

        static List<PhoneBook> data;
        static SampleDataController()
        {
            data = new List<PhoneBook>
            {
                new PhoneBook { Id = Guid.NewGuid().ToString(), Name="Andy", Room=23 , Phone = "123"},
                new PhoneBook { Id = Guid.NewGuid().ToString(), Name="Sveta", Room=45 , Phone = "321" },
                new PhoneBook { Id = Guid.NewGuid().ToString(), Name="Nata", Room=32 , Phone = "32" },
                new PhoneBook { Id = Guid.NewGuid().ToString(), Name="Elen", Room=32 , Phone = "23" }
            };
        }

        [HttpPost]
        public IActionResult Post([FromBody]PhoneBook phone)
        {
            phone.Id = Guid.NewGuid().ToString();
            data.Add(phone);
            return Ok(phone);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            PhoneBook phone = data.FirstOrDefault(x => x.Id == id);
            if (phone == null)
            {
                return NotFound();
            }
            data.Remove(phone);
            return Ok(phone);
        }

        public class PhoneBook
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public int Room { get; set; }
            public string Phone { get; set; }
        
        }
    }
}
