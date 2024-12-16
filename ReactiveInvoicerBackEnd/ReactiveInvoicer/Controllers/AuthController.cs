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


            if (!AuthenticateUser(request.Username, HashWitSha1(request.Password)))
                return Unauthorized(new { message = "Invalid username or password" });


            var token = GenerateJwtToken(request.Username);


            return Ok(new { token });
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] LoginRequestDTO request)
        {

            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Username and password are required" );
            if (request.Password.Length<6)
            {
                return BadRequest("Password must be minimum 6 symbols!");
            }
            if (_context.Users.FirstOrDefault(x=>x.Username==request.Username)!=null)
            {
                return BadRequest($"User with username {request.Username} already exist");
            }
            User user = new User()
            {
                Id = Guid.NewGuid().ToString(),
                Username = request.Username,
                Password = HashWitSha1(request.Password),
                Role="Client"
            };
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registed successfully");
        }


        private bool AuthenticateUser(string username, string password)
        {

            return _context.Users.FirstOrDefault(x => x.Username == username && x.Password == password) != null;
        }
        private static string HashWitSha1(string text)
        {
            var sha1 = System.Security.Cryptography.SHA1.Create();
            var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(text));
            return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
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
