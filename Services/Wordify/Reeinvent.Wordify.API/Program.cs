using Microsoft.Extensions.Configuration;
using Reeinvent.Common.Validations.Extensions;
using Reeinvent.Wordify.API;
using Reeinvent.Wordify.Core.Services.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
    .AddCoreServices()
    .EnableValidations()
    .AddControllers();

builder.Services.Configure<RouteOptions>(options =>
 {
     options.LowercaseUrls = true;
 });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var allowedOrigins = builder.Configuration.GetSection(Config.AllowedDomainsKey).Value;
var corsPolicyName = builder.Configuration.GetSection(Config.CorsPolicyName).Value;

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
    builder =>
    {
        builder.WithOrigins(allowedOrigins)
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(corsPolicyName);

app.Run();
