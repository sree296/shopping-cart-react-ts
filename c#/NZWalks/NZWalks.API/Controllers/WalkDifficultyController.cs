using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NZWalks.API.Models.Domain;
using NZWalks.API.Models.DTO;
using NZWalks.API.Repositories;

namespace NZWalks.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WalkDifficultyController : Controller
    {
        private readonly IWalkDifficultyRespository walkDifficultyRespository;
        private readonly IMapper mapper;

        public WalkDifficultyController(IWalkDifficultyRespository walkDifficultyRespository, IMapper mapper)
        {
            this.walkDifficultyRespository = walkDifficultyRespository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWalkDifficulty()
        {
            var walkDifficulties = await walkDifficultyRespository.GetAllWalkDifficultiesAsync();

            // Retrun DTO Walks using Mapper
            var walkDifficultiesDTO = mapper.Map<List<Models.DTO.WalkDifficulty>>(walkDifficulties);

            return Ok(walkDifficultiesDTO);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetWalkDifficultyById(Guid id)
        {
            var walkDifficuly = await walkDifficultyRespository.GetWalkDifficultyByIdAsync(id);

            if(walkDifficuly == null)
            {
                return NotFound();
            }

            var walkDifficultyDTO = mapper.Map<Models.DTO.WalkDifficulty>(walkDifficuly);
            return Ok(walkDifficultyDTO);
        }

        [HttpPost]
        public async Task<IActionResult> AddWalkDifficulty(Models.DTO.WalkDifficultyRequest walkDifficultyRequest)
        {
            // Convert DTO to Domain Model
            var walkDifficultyDomain = new Models.Domain.WalkDifficulty
            {
                Code = walkDifficultyRequest.Code,
            };

            walkDifficultyDomain = await walkDifficultyRespository.AddWalkDifficultyAsync(walkDifficultyDomain);

            if (walkDifficultyDomain == null)
            {
                return NotFound();
            }
            //Convert Doamin to DTO
            var walkDifficultyDTO = mapper.Map<Models.DTO.WalkDifficulty>(walkDifficultyDomain);

            return Ok(walkDifficultyDTO);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateWalkDifficulty([FromRoute] Guid id, [FromBody] Models.DTO.UpdateWalkDifficultyRequest updateWalkDifficultyRequest)
        {
            // Convert DTO to Domain Model
            var walkDifficultyDomain = new Models.Domain.WalkDifficulty()
            {
                 Code = updateWalkDifficultyRequest.Code,
            };

            walkDifficultyDomain = await walkDifficultyRespository.UpdateWalkDifficultyAsync(id, walkDifficultyDomain);

            if (walkDifficultyDomain == null)
            {
                return NotFound();
            }

            
            // Convert Domain model to DTO
           var walkDifficultyDTO = mapper.Map<Models.DTO.WalkDifficulty>(walkDifficultyDomain);

           return Ok(walkDifficultyDTO.Id);

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteWalkDifficulty(Guid id)
        {
            var WalkDifficulty = await walkDifficultyRespository.DeleteWalkDifficultyAsync(id);

            if (WalkDifficulty == null)
            {
                return NotFound();
            }

            // Convert Response back to DTO
            var WalkDifficultyDTO = new Models.DTO.WalkDifficulty()
            {
                Id = WalkDifficulty.Id,
            };

            return Ok(WalkDifficultyDTO.Id);
        }


    }
}
