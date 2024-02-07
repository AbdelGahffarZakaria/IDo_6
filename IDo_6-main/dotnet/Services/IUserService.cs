using IDO.Models;
using IDO_6.dotnet.Models;
using Microsoft.AspNetCore.Mvc;

namespace IDO_6.dotnet.Services
{
    public interface IUserService
    {
        Task<ActionResult<User>> login(User user);
        Task<ActionResult<User>> authorize(User user);
    }
}
