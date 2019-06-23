using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WebApplication3.Models;

namespace WebApplication3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
            using (ApplicationContext db = new ApplicationContext())
            {
                PhoneBook user1 = new PhoneBook { Id = Guid.NewGuid().ToString(), Name = "Andy", Room = 23, Phone = "123" };
                PhoneBook user2 = new PhoneBook { Id = Guid.NewGuid().ToString(), Name = "Sveta", Room = 45, Phone = "321" };           
                
                // добавляем их в бд
                db.PhoneBooks.Add(user1);
                db.PhoneBooks.Add(user2);
                db.SaveChanges();

                // получаем объекты из бд и выводим на консоль
                var users = db.PhoneBooks.ToList();
                Console.WriteLine("Users list:");
                foreach (PhoneBook u in users)
                {
                    Console.WriteLine($"{u.Id}.{u.Name} - {u.Room}");
                }
            }
            Console.Read();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
