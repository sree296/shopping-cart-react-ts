using Microsoft.EntityFrameworkCore;
using NZWalks.API.Data;
using NZWalks.API.Models.Domain;

namespace NZWalks.API.Repositories
{
    public class WalkRepository : IWalkRepository
    {
        private readonly NZWalksDbContext nZWalksDbContext;

        // constructor
        public WalkRepository(NZWalksDbContext nZWalksDbContext)
        {
            this.nZWalksDbContext = nZWalksDbContext;
        }

        public async Task<Walk> AddWalkAsync(Walk walk)
        {
            walk.Id = Guid.NewGuid();
            await nZWalksDbContext.AddAsync(walk);
            await nZWalksDbContext.SaveChangesAsync();

            return walk;
        }

        public async Task<Walk> DeleteWalkAsync(Guid id)
        {
            var walk = await nZWalksDbContext.Walks.FirstOrDefaultAsync(x => x.Id == id);
            if(walk == null)
            {
                return null;
            }
            nZWalksDbContext.Walks.Remove(walk);
            await nZWalksDbContext.SaveChangesAsync();

            return walk;

        }

        public async Task<IEnumerable<Walk>> GetAllWalkAsync()
        {
            return await 
                       nZWalksDbContext.Walks
                        .Include(x => x.Region)
                        .Include(x => x.WalkDifficulty)
                        .ToListAsync();
        }

        public async Task<Walk> GetWalkAsync(Guid id)
        {
            return await nZWalksDbContext.Walks
                        .Include(x => x.Region)
                        .Include(x => x.WalkDifficulty)
                        .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Walk> UpdateWalkAsync(Guid id, Walk walk)
        {
            var existingWalk = nZWalksDbContext.Walks.FirstOrDefault(x => x.Id == id);

            if (existingWalk == null)
            {
                return null;
            }

            existingWalk.Name = walk.Name;
            existingWalk.WalkDifficulty = walk.WalkDifficulty;
            existingWalk.WalkDifficultyId = walk.WalkDifficultyId;
            existingWalk.Length = walk.Length;

            await nZWalksDbContext.SaveChangesAsync();

            return existingWalk;

        }
    }
}
