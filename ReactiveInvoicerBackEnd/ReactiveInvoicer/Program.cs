
using Microsoft.EntityFrameworkCore;
using ReactiveInvoicer.Models;

namespace ReactiveInvoicer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers()
                  .AddJsonOptions(options =>
                  {
                      options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                      options.JsonSerializerOptions.WriteIndented = true;
                  });
            builder.Services.AddDbContext<ReactiveInvoiceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var dbcontext = scope.ServiceProvider.GetRequiredService<ReactiveInvoiceContext>();
                dbcontext.Database.EnsureDeleted();
                dbcontext.Database.EnsureCreated();
                DbInitializer.Initialize(builder.Configuration.GetConnectionString("DefaultConnection"));
            }
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
