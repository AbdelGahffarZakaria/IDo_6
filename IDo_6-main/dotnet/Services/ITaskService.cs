using IDO.Models;
using Microsoft.AspNetCore.Mvc;

namespace IDO_6.dotnet.Services
{
    public interface ITaskService
    {
        Task<ActionResult<IEnumerable<Task1>>> getAll();
        Task<IActionResult> updateOne(Task1 task);
        Task<ActionResult<Task1>> createOne(Task1 task);
    }
}
