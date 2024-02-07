using Microsoft.AspNetCore.Mvc;
using IDO.Data;
using IDO.Models;
using IDO_6.dotnet.Services;

namespace IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDODBContext _context;
        private readonly IUserService _userService;

        public UsersController(IDODBContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // POST: api/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User request)
        {
            return await _userService.login(request);
        }

        // POST: api/auth
        [HttpPost("auth")]
        public async Task<ActionResult<User>> authorize(User request)
        {
            return await _userService.authorize(request);
        }  
    }
}
