using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext context;
        public FeaturesController(VegaDbContext context)
        {
            this.context = context;

        }

        [HttpGet("api/features")]
        public async Task<List<Feature>> GetTasks(){
            return await context.Features.ToListAsync();
        }
    }
}