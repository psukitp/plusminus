using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using plusminus.Data;
using plusminus.Middlewares;
using plusminus.Repository;
using plusminus.Services;
using plusminus.Utils;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Plusminus API", Version = "v1" });
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        //options.Cookie.Domain = builder.Environment.IsDevelopment() ? null : "plusminus-app.ru";
        options.Cookie.Name = ".AspNetCore.Cookies";
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromDays(14);
        options.SlidingExpiration = true;
    });

builder.Services.AddHttpContextAccessor();

builder.Services.Configure<SMTP>(builder.Configuration.GetSection("SMTP"));

builder.Services.AddScoped<AuthorizeFilter>();
builder.Services.AddScoped<HttpContextAccessorService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped<ExpensesService>();
builder.Services.AddScoped<IncomesService>();
builder.Services.AddScoped<CategoryIncomesService>();
builder.Services.AddScoped<CategoryExpensesService>();
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<UserSettingsService>();
builder.Services.AddMemoryCache();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opt => { opt.SwaggerEndpoint("/swagger/v1/swagger.json", "Plusminus API V1"); });
}

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(appBuilder =>
{
    appBuilder.AllowCredentials();
    appBuilder.AllowAnyHeader();
    appBuilder.AllowAnyMethod();
    appBuilder.SetIsOriginAllowed(origin => true);
});

app.UseHttpsRedirection();

app.MapControllers();

app.Run();