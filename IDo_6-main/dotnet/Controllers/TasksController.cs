using IDO.Models;
using IDO_6.dotnet.Services;
using Microsoft.AspNetCore.Mvc;

namespace IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task1>>> GetTasks()
        {
            return await _taskService.getAll();
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(Task1 request)
        {
            return await _taskService.updateOne(request);
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Task1>> PostTask(Task1 request)
        {
            return await _taskService.createOne(request);
        }

    }
}
