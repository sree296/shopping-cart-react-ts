
using NZWalks.API.Models.Domain;

namespace NZWalks.API.Repositories
{
    public interface IWalkDifficultyRespository
    {
        Task<IEnumerable<WalkDifficulty>> GetAllWalkDifficultiesAsync();

        Task<WalkDifficulty> GetWalkDifficultyByIdAsync(Guid id);

        Task<WalkDifficulty> AddWalkDifficultyAsync(WalkDifficulty walkDifficulty);

        Task<WalkDifficulty> DeleteWalkDifficultyAsync(Guid id);

        Task<WalkDifficulty> UpdateWalkDifficultyAsync(Guid id, WalkDifficulty walkDifficulty);
    }
}
