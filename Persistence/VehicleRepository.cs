using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Models;
using Vega.Core;
using System;
using System.Collections.Generic;

namespace Vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle){
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle){
            context.Vehicles.Remove(vehicle);
        }

        public async Task<Vehicle> GetVehicleWithMake(int id){
            return await context.Vehicles.FindAsync(id);
        }

        public async Task<List<Vehicle>> GetVehicles()
        {
            return await context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
            .ToListAsync();
        }
    }
}