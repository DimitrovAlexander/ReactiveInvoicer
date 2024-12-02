using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReactiveInvoicer.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactiveInvoicer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ReactiveInvoiceContext _context;

        // Secret key for signing the JWT (Store this securely)
        private const string JwtSecretKey = "Molim-Vi-Uvajaemi-Ocenqvashti:-Pishete-ni-otlichen-6!";
        public AuthController(ReactiveInvoiceContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO request)
        {

            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest(new { message = "Username and password are required" });


            if (!AuthenticateUser(request.Username, request.Password))
                return Unauthorized(new { message = "Invalid username or password" });


            var token = GenerateJwtToken(request.Username);


            return Ok(new { token });
        }


        private bool AuthenticateUser(string username, string password)
        {
            // Dummy user validation
            return _context.Users.FirstOrDefault(x => x.Username == username && x.Password == password) != null;
        }


        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(JwtSecretKey);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username), 
                    new Claim(ClaimTypes.Role, "User")    
                }),
                Expires = DateTime.UtcNow.AddHours(9), 
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}
