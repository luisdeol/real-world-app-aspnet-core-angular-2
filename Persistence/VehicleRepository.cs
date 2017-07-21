using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vega.Models;
using Vega.Core;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public async Task<List<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();
            
            if (queryObj.MakeId.HasValue)
                query = query
                    .Where(v => v.Model.MakeId == queryObj.MakeId);
            
            if (queryObj.ModelId.HasValue)
                query = query
                    .Where(v => v.ModelId == queryObj.ModelId); 

            if (queryObj.SortBy == "make")
                query = (queryObj.IsSortAscending) ?
                    query.OrderBy(v => v.Model.Make.Name) : 
                        query.OrderByDescending(v => v.Model.Make.Name);   
            
            if (queryObj.SortBy == "model")
                query = (queryObj.IsSortAscending) ?
                    query.OrderBy(v => v.Model.Name) : 
                        query.OrderByDescending(v => v.Model.Name);  
            
            if (queryObj.SortBy == "contactName")
                query = (queryObj.IsSortAscending) ?
                    query.OrderBy(v => v.ContactName) : 
                        query.OrderByDescending(v => v.ContactName); 
            
            if (queryObj.SortBy == "id")
                query = (queryObj.IsSortAscending) ?
                    query.OrderBy(v => v.Id) : 
                        query.OrderByDescending(v => v.Id); 

            return await query.ToListAsync();
        }
    }
}