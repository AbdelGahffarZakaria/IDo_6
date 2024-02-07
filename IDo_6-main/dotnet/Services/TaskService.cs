using IDO.Data;
using IDO.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IDO_6.dotnet.Services
{
    public class TaskService : ControllerBase, ITaskService
    {
        private IDODBContext _context;

        public TaskService(IDODBContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Task1>>> getAll()
        {
            return Ok(await _context.Tasks.ToListAsync());
        }

        public async Task<IActionResult> updateOne(Task1 request)
        {
            var Task = await _context.Tasks.FindAsync(request.Id);
            if (Task == null)
                return BadRequest("not found");

            Task.Category = request.Category;
            Task.DueDate = request.DueDate;
            Task.Estimate = request.Estimate;
            Task.Title = request.Title;
            Task.Status = request.Status;
            Task.Importance = request.Importance;
            await _context.SaveChangesAsync();
            return Ok(request);
        }


        public async Task<ActionResult<Task1>> createOne(Task1 request)
        {
            _context.Tasks.Add(request);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTask", new { id = request.Id }, request.Id);

        }

    }
}
